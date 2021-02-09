require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  generateRefreshToken: data => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },
  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
    });
  },
  sendAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken: accessToken }, message: 'ok' });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.status(202).json({
      data: { accessToken, userInfo: data },
      message: 'New AccessToken, please restore and request again',
    });
  },
  isAuthorized: req => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    console.log(authorization);
    const token = authorization.split(' ')[1];
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  checkRefeshToken: refreshToken => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      // return null if refresh token is not valid
      return null;
    }
  },
};
