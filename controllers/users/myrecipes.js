const { content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  get: async (req, res) => {
    //TODO: 유저정보 get 요청 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(401).send('invalid user');
    } else if (accessTokenData) {
      const { id } = accessTokenData;
      const myrecipes = await content.findAll({
        attributes: ['id', 'title', 'thumbnail_url', 'createdAt'],
        where: { userId: id },
      });
      if (!myrecipes) {
        res.status(204).send('cannot find recipe');
      }
      let filteredRecipies = [];
      for (let i = 0; i < myrecipes.length; i++) {
        filteredRecipies.push(myrecipes[i].dataValues);
      }
      res.status(200).json({ data: { recipes: filteredRecipies } });
    } else {
      res.status(500).send('err');
    }
  },
};
