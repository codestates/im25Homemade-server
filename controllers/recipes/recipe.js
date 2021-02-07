const { content, image, category } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // 레시피 목록에서 한개 클릭 시 보이는 로직

    const recipe = await content.findOne({
      where: { id: req.body.id },
    });

    const image = await image.findOne({
      where: { contentId: req.body.id },
      attributes: ['image_url', 'order'],
    });

    const category = await category.findOne({
      where: { id: recipe.dataValues.categoryId },
    });

    if (!recipe) {
      res.status(400).send('Bad Request');
    } else if (recipe) {
      res.status(200).send({
        data: {
          recipe: {
            ...category.dataValues,
            ...recipe.dataValues,
            ...image.dataValues,
          },
        },
      });
    }

    res.status(500).send('err');
  },
};
