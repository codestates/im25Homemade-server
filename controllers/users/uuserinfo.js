const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');
const crypto = require('crypto');
require('dotenv').config();

module.exports = {
  patch: async (req, res) => {
    //TODO: 유저정보 업데이트 로직 작성

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const { password, mobile, avatar } = req.body;

      const isUpdated = async () => {
        if (password) {
          const encrypted = crypto
            .pbkdf2Sync(
              password,
              process.env.DATABASE_SALT,
              100000,
              64,
              'sha512',
            )
            .toString('base64');
          return user.update(
            {
              password: encrypted,
              updatedAt: new Date(),
            },
            {
              where: { id: accessTokenData.id },
            },
          );
        } else if (mobile) {
          return user.update(
            {
              mobile: mobile,
              updatedAt: new Date(),
            },
            {
              where: { id: accessTokenData.id },
            },
          );
        } else if (avatar) {
          return user.update(
            {
              avatar_url: avatar,
              updatedAt: new Date(),
            },
            {
              where: { id: accessTokenData.id },
            },
          );
        }
      };

      const isUpdatedResult = await isUpdated();

      if (!isUpdatedResult) {
        res.status(404).send('result not found');
      }
      const returnedUpdatedUserinfo = await user.findOne({
        where: { id: accessTokenData.id },
      });
      delete returnedUpdatedUserinfo.dataValues.password;
      return res.status(200).json({
        data: { userInfo: returnedUpdatedUserinfo.dataValues },
        message: 'ok',
      });
    }
    res.status(500).send('err');
  },
};
