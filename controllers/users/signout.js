const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: (req, res) => {
    //TODO: 로그아웃 로직 작성
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(400).send("you're currently not logined");
    } else {
      // TODO: 로그아웃 요청에 토큰 삭제가 필요?
      const { email } = accessTokenData;
      const userInfo = user.findOne({ where: { email } });
      if (!userInfo) {
        return res.send('access token has been tempered');
      }
      res.status(200).send('successfully signed out!');
    }
  },
};
