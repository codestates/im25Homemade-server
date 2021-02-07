const { content, image, category } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // 레시피 목록에서 한개 클릭 시 보이는 로직
    console.log(req.params);
    const recipe = await content.findOne({
      where: { id: req.params.id },
    });
    console.log(recipe);
    const image = await image.findOne({
      where: { contentId: req.params.id },
      attributes: ['image_url', 'order'],
    });

    const category = await category.findOne({
      where: { id: recipe.dataValues.categoryId },
    });

    if (!recipe) {
      return res.status(400).send('Bad Request');
    } else if (recipe) {
      return res.status(200).send({
        data: {
          recipe: {
            ...category.dataValues,
            ...recipe.dataValues,
            ...image.dataValues,
          },
        },
      });
    }

    return res.status(500).send('err');
  },
};
