const { comment, content, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');
const { randomBytes } = require('crypto');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 댓글 작성 요청 로직 작성
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      refreshToken(req, res);
    } else if (accessTokenData) {
      const createNewComment = await comment
        .create({
          text: req.body.text,
          userId: accessTokenData.id,
          contentId: req.body.id,
        })
        .then(data => {
          return data.dataValues;
        });

      if (req.body.rate) {
        const rates = await content
          .findOne({
            where: { id: req.body.id },
            attributes: ['rate'],
          })
          .then(data => {
            return data.dataValues.rate;
          });

        await content.update(
          {
            rate: rates + req.body.rate,
          },
          {
            where: { id: req.body.id },
          },
        );
      }

      const username = await user
        .findOne({
          where: { id: req.body.userId },
          attributes: ['nickname'],
        })
        .then(data => {
          if (data) {
            return data.dataValues.nickname;
          } else {
            return res.status(404).send('cannot find user');
          }
        });
      const currentTime = await comment
        .findOne({
          where: { id: createNewComment.id },
          attributes: ['createdAt'],
        })
        .then(data => {
          return data.dataValues.createdAt;
        });

      return res.status(201).send({
        data: {
          commentInfo: {
            id: createNewComment.id,
            nickname: username,
            created_At: currentTime,
            text: createNewComment.text,
            rate: req.body.rate,
          },
        },
        message: 'ok',
      });
    }

    return res.status(500).send('err');
  },
};
