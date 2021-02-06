const { user } = require('../../models');
module.exports = {
  post: (req, res) => {
    //TODO: 유저 탈퇴 요청
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(400).send('Bad request');
    } else {
      // TODO: 로그아웃 요청에 토큰 삭제가 필요?
      const { email } = accessTokenData;
      //! comments, contents, images,.. 모두 삭제. 나중에 할것.
      const userInfo = user.findOne({ where: { email } });
      //?
      if (!userInfo) {
        res.send('access token has been tempered');
        return;
      }
      res.status(200).send('successfully signed out!');
    }
  },
};
