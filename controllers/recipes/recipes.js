const { content, category } = require('../../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
module.exports = {
  get: async (req, res) => {
    //TODO: 모든 레시피 요청 로직 작성
    const allRecipe = await content.findAll({
      where: {},
      include: [{ model: category, attributes: ['name'] }],
    });

    const searchWord = req.params.searchWord;
    const searchResults = await content.findAll({
      where: {
        title: {
          [Op.like]: '%' + searchWord + '%',
        },
      },
      order: [['rate', 'DESC']],
    });

    if (!allRecipe) {
      res.send(400).send('Bad Request');
    } else if (allRecipe) {
      res.status(200).send(searchResults);
    }
    res.status(500).send(err);
  },
};
