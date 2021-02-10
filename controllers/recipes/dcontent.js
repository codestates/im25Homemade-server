const { content, image, comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 글 삭제 요청 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const contentInfo = await content
        .destroy({
          where: { id: req.body.id },
        })
        .then(data => {
          return data;
        });
      console.log(contentInfo);

      await image.destroy({
        where: { contentId: contentInfo },
      });

      await comment.destroy({
        where: { contentId: contentInfo },
      });

      if (!accessTokenData) {
        return res.status(401).send('access token has been tempered');
      }

      return res.status(200).send('delete content successfully');
    }
    return res.status(500).send('err');
  },
};
