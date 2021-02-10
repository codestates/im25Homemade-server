const { content, category, user } = require('../../models');
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
      let categorysId;
      await category
        .findOne({
          where: { name: req.query.category },
        })
        .then(data => {
          if (!data) {
            return res.status(404).send('plz type correct category name');
          } else {
            categorysId = data.dataValues.id;
          }
        });

      const allContent = await content.findAndCountAll({
        where: { categoryId: categorysId },
        attributes: [
          'id',
          'title',
          'content',
          'thumbnail_url',
          'createdAt',
          'rate',
          'views',
          'userId',
          'categoryId',
        ],
        offset: offset,
        limit: 20,
      });

      let users;
      for (let i = 0; i < allContent.count; i++) {
        users = await user.findOne({
          where: { id: allContent.rows[i].dataValues.userId },
          attributes: ['nickname'],
        });
        if (users !== null) {
          allContent.rows[i].dataValues.nickname = users.dataValues.nickname;
        }
      }

      // 카테고리네임 추가
      allContent.rows.map(
        item => (item.dataValues.categoryName = req.query.category),
      );

      return res.status(200).send({
        data: {
          recipes: allContent.rows,
          contentSum: allContent.count,
        },
      });

      //case2. 검색어에 따른 데이터 get
    } else if (req.query.q && req.query.page) {
      const keyword = req.query.q;

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
      console.log(searchResults);
      let valuesCategory;
      if (searchResults.count !== 0) {
        valuesCategory = await category
          .findOne({
            where: { id: searchResults.rows[0].dataValues.categoryId },
          })
          .then(data => data.dataValues.name);
      }
      // 카테고리네임 추가
      searchResults.rows.map(item => {
        item.dataValues.categoryName = valuesCategory;
        delete item.dataValues.categoryId;
      });

      return res.status(200).send({
        data: {
          recipes: searchResults.rows,
          contentSum: searchResults.count,
        },
      });
    }
  },
};
