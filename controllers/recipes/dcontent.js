const { content, image, categorie } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 글 삭제 요청 로직 작성
    const accessTokenData = isAuthorized(req);
    if (accessTokenData) {
      const contentInfo = await content.destroy({
        where: { id: req.body.id },
      });

      await image.destroy({
        where: { contentId: contentInfo.dataValues.id },
      });

      await category.destroy({
        where: { id: contentInfo.dataValues.categoryId },
      });

      res.status(200).send('delete content successfully');
    } else if (!accessTokenData) {
      res.status(401).send('invalid token');
    }
    res.send('err');
  },
};
