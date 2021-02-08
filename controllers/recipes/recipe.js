const { content, image, category, user, comment } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // 레시피 목록에서 한개 클릭 시 보이는 로직

    const recipe = await content.findOne({
      where: { id: req.params.id },
    });
    delete recipe.dataValues.updatedAt;

    const images = await image.findAll({
      where: { contentId: req.params.id },
      attributes: ['image_url', 'order'],
    });

    const categorys = await category.findOne({
      where: { id: recipe.dataValues.categoryId },
    });
    delete categorys.dataValues.updatedAt;
    delete categorys.dataValues.createdAt;

    const users = await user.findOne({
      where: { id: recipe.dataValues.userId },
      attributes: ['nickname'],
    });

    const comments = await comment.findAll({
      where: { contentId: recipe.dataValues.id },
      attributes: ['text'],
    });

    if (!recipe) {
      return res.status(400).send('Bad Request');
    } else if (recipe) {
      return res.status(200).send({
        data: {
          recipe: {
            id: recipe.dataValues.id,
            username: users.dataValues.nickname,
            title: recipe.dataValues.content,
            thumbnail_url: recipe.dataValues.thumbnail_url,
            image_urls: images,
            comments: comments,
            create_at: recipe.dataValues.createdAt,
            rate: recipe.dataValues.rete,
            views: recipe.dataValues.views,
            categoryName: categorys.name,
          },
        },
      });
    }

    return res.status(500).send('err');
  },
};
