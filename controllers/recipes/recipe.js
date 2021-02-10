const { content, image, category, user, comment } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // 레시피 목록에서 한개 클릭 시 보이는 로직

    const recipe = await content.findOne({
      where: { id: req.params.id },
    });

    if (recipe === null) {
      return res.status(400).send('cannot find recipe');
    }

    delete recipe.dataValues.updatedAt;

    // 조회수 증가
    await content.update(
      {
        views: recipe.dataValues.views + 1,
      },
      {
        where: { id: req.params.id },
      },
    );

    const images = await image
      .findAll({
        where: { contentId: req.params.id },
        attributes: ['image_url', 'order'],
      })
      .then(data => {
        const sortedImages = [];
        for (let i = 0; i < data.length; i++) {
          sortedImages.push(data[i].dataValues.image_url);
        }
        return sortedImages;
      });

    const categoryName = await category
      .findOne({
        where: { id: recipe.dataValues.categoryId },
      })
      .then(data => data.dataValues.name);

    const users = await user.findOne({
      where: { id: recipe.dataValues.userId },
      attributes: ['nickname'],
    });

    const comments = await comment
      .findAll({
        where: { contentId: recipe.dataValues.id },
        attributes: ['text', 'createdAt'],
      })
      .then(data => {
        const commentsArr = [];
        for (let i = 0; i < data.length; i++) {
          commentsArr.push(data[i].dataValues.text);
        }
        return commentsArr;
      });

    if (recipe) {
      return res.status(200).send({
        data: {
          recipe: {
            id: recipe.dataValues.id,
            username: users.dataValues.nickname,
            title: recipe.dataValues.title,
            content: recipe.dataValues.content,
            thumbnail_url: recipe.dataValues.thumbnail_url,
            image_urls: images,
            create_at: recipe.dataValues.createdAt,
            comments: comments,
            rate: recipe.dataValues.rate,
            views: recipe.dataValues.views,
            categoryName: categoryName,
          },
        },
      });
    }

    return res.status(500).send('err');
  },
};
