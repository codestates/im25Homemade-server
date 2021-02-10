const { user, content, image, category, user_label } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  delete: async (req, res) => {
    //TODO: 유저 회원탈퇴 로직
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      const userData = await user.destroy({
        where: { id: accessTokenData.id },
      });
      if (!userData) {
        return res.status(401).send('access token has been tempered');
      }
      const contentInfo = await content.destroy({
        where: { userId: accessTokenData.id },
      });

      await image.destroy({
        where: { id: contentInfo.dataValues.id },
      });

      return res.status(200).send('delete content successfully');
    }
    return res.status(500).send('err');
  },
};
