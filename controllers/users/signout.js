const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');
module.exports = {
  post: (req, res) => {
    //TODO: 로그아웃 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      const { email } = accessTokenData;
      const userInfo = user.findOne({ where: { email } });
      if (!userInfo) {
        return res.status(401).send('access token has been tempered');
      }
      res.status(200).send('successfully signed out!');
    }
  },
};
