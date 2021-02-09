const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');


module.exports = {
  patch: async (req, res) => {
    //TODO: 유저정보 업데이트 로직 작성

    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const { password, nickname, mobile, avatar } = req.body;

      const isUpdated = await user.update(
        {
          nickname: nickname,
          password: password,
          mobile: mobile,
          avatar_url: avatar,
          updatedAt: new Date(),
        },
        {
          where: { id: accessTokenData.id },
          returning: true,
          plain: true,
        },
      );
      if (!isUpdated) {
        throw 'Error while Updating';
      }
      const returnedUpdatedUserinfo = await user.findOne({
        where: { id: accessTokenData.id },
      });
      delete returnedUpdatedUserinfo.dataValues.password;
      res.status(200).json({
        data: { userInfo: returnedUpdatedUserinfo.dataValues },
        message: 'ok',
      });
    } else {
      res.status(500).send('err');
    }
  },
};
