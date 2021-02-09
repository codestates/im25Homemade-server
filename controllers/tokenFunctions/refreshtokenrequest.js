const {
  checkRefeshToken,
  generateAccessToken,
  resendAccessToken,
} = require('.');
const { user } = require('../../models');

module.exports = {
  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).send('refresh token not provided');
    }

    const refreshTokenData = checkRefeshToken(refreshToken);
    if (!refreshTokenData) {
      return res
        .status(202)
        .send('refresh token is outdated, pleaes log in again');
    }

    const { email } = refreshTokenData;
    user
      .findOne({ where: { email } })
      .then(data => {
        if (!data) {
          return res.status(401).send('refresh token has been tempered');
        }
        delete data.dataValues.password;

        const newAccessToken = generateAccessToken(data.dataValues);
        resendAccessToken(res, newAccessToken, data.dataValues);
      })
      .catch(err => {
        console.log(err);
      });
  },
};
