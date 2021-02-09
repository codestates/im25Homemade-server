const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  get: async (req, res) => {
    //TODO: 유저정보 get 요청 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const { email } = accessTokenData;
      const userInfo = await user.findOne({ where: { email } });
      if (!userInfo) {
        return res.status(401).send('access token has been tempered');
      }
      delete userInfo.dataValues.password;
      res
        .status(200)
        .json({ data: { userInfo: userInfo.dataValues }, message: 'ok' });
    } else {
      res.status(500).send('err');
    }
  },
};
