const { user } = require('../../models'); //! 수정필요.
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

module.exports = {
  //TODO: 로그인 로직 작성
  post: async (req, res) => {
    const userInfo = await user.findOne({
      where: { email: req.body.email, password: req.body.password },
    });

    if (!userInfo) {
      res.status(400).send('not authorized');
    } else {
      //userInfo 가 존재할 경우 accessToken 부여.
      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      const refreshToken = generateRefreshToken(userInfo.dataValues);

      sendRefreshToken(res, refreshToken);
      sendAccessToken(res, accessToken);
      return;
    }
    res.sendStatus(500).send('err');
  },
};
