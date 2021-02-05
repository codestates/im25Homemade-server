const { user } = require('../../models'); //! 수정필요.
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

// const userinfo = require('./userinfo');
// const { response } = require('express');

module.exports = {
  //TODO: 로그인 로직 작성
  post: async (req, res) => {
    // console.log(req);
    const userInfo = await user.findOne({
      where: { email: req.body.email, password: req.body.password },
    });

    if (!userInfo) {
      // your code here
      res.status(400).send('not authorized');
    } else {
      //userInfo 가 존재할 경우 accessToken 부여.
      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      const refreshToken = generateRefreshToken(userInfo.dataValues);

      sendAccessToken(res, accessToken);
      sendRefreshToken(res, refreshToken);
    }
    req.status(500).send(err);
  },
};
