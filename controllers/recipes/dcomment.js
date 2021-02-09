const { content, image } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 글 삭제 요청 로직 작성
    const accessTokenData = isAuthorized(req);

    if (accessTokenData) {
      try {
        await content.destroy({
          where: { id: req.body.id },
        });

        await image.destroy({
          where: { contentId: req.body.id },
        });

        res.status(200).send('delete content successfully');
      } catch {
        res.status(500).send('err');
      }
    } else if (!accessTokenData) {
      return res.status(401).send('invalid token');
    }
  },
};
