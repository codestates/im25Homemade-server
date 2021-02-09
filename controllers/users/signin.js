const { user } = require('../../models');

const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('../tokenFunctions');

const crypto = require('crypto');
require('dotenv').config;

module.exports = {
  //TODO: 로그인 로직 작성
  post: async (req, res) => {
    const encrypted = crypto
      .pbkdf2Sync(
        req.body.password,
        process.env.DATABASE_SALT,
        100000,
        64,
        'sha512',
      )
      .toString('base64');
    const userInfo = await user.findOne({
      where: { email: req.body.email, password: encrypted },
    });

    if (!userInfo) {
      res.status(400).send('not authorized');
    } else if (userInfo) {
      //userInfo 가 존재할 경우 accessToken 부여
      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      const refreshToken = generateRefreshToken(userInfo.dataValues);

      //순서 중요. ERR_HTTP_HEADERS_SENT 에러 발생.
      sendRefreshToken(res, refreshToken);
      sendAccessToken(res, accessToken);
    } else {
      return res.status(500).send('err');
    }
  },
};
