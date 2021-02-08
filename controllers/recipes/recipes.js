const { content, category } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
module.exports = {
  get: async (req, res) => {
    // pagination
    const pageNum = req.query.page;
    let offset = 0;
    if (pageNum > 1) {
      offset = 20 * (pageNum - 1);
    }

    //case1. 카테고리에 따른 데이터 get
    if (req.query.category && req.query.page) {
      const categoryName = req.query.category;

      const categoryValue = await category.findOne({
        where: { name: categoryName },
      });

      const allContent = await content.findAndCountAll({
        where: { categoryId: categoryValue.dataValues.id },
        attributes: [
          'id',
          'title',
          'thumbnail_url',
          'createdAt',
          'rate',
          'views',
        ],
        offset: offset,
        limit: 20,
      });

      // 카테고리네임 추가
      allContent.rows.map(
        item => (item.dataValues.categoryName = categoryValue.dataValues.name),
      );

      //총 필요한 페이지 갯수
      let allPages = Math.round(allContent.count / 20);
      if (allPages < 1) {
        allPages = 1;
      }

      return res.status(200).send({
        data: {
          recipes: [allContent.rows],
          allPages: allPages,
        },
      });
      //case2. 검색어에 따른 데이터 get
    } else if (req.query.q && req.query.page) {
      const keyword = req.query.q;
      console.log(keyword);
      const searchResults = await content.findAndCountAll({
        where: {
          title: {
            [Op.like]: `%${keyword}%`,
          },
        },
        attributes: [
          'id',
          'title',
          'thumbnail_url',
          'createdAt',
          'rate',
          'views',
          'categoryId',
        ],
        offset: offset,
        limit: 20,
      });

      if (searchResults.count === 0) {
        console.log('hihi');
        return res.status(204);
      }

      const categoryValue = await category.findOne({
        where: { id: searchResults.rows[0].categoryId },
        attributes: ['name'],
      });

      // 카테고리네임 추가
      searchResults.rows.map(item => {
        item.dataValues.categoryName = categoryValue.dataValues.name;
        delete item.dataValues.categoryId;
      });
      //총 필요한 페이지 갯수
      let allPages = Math.round(searchResults.count / 20);
      if (allPages < 1) {
        allPages = 1;
      }

      return res.status(200).send({
        data: {
          recipes: [searchResults.rows],
          allPages: allPages,
        },
      });
    }
    return res.status(500).send('err');
  },
};
