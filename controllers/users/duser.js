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
      const userId = accessTokenData.id;
      const contentInfo = await content.findOne({
        where: { userId: userId },
      });
      if (!contentInfo) {
        return res.status(400).send('cannot find content');
      }
      try {
        await content.destroy({
          where: { userId: userId },
        });

        await image.destroy({
          where: { contentid: contentInfo.dataValues.id },
        });

        await user.destroy({
          where: { id: userId },
        });
      } catch (err) {
        return res.status(400).send(err);
      }
      if (!userData) {
        return res.status(401).send('access token has been tempered');
      }
      return res.status(200).send('delete content successfully');
    }
    return res.status(500).send('err');
  },
};
