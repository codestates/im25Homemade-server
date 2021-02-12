const { comment, user } = require('../../models');
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
      const createNewComment = await comment.create({
        text: req.body.text,
        userId: accessTokenData.id,
        contentId: req.body.id,
        rate: req.body.rate ? req.body.rate : null,
      });
      if (!createNewComment.dataValues.id) {
        return res.status(400).send('cannot create comment');
      }

      const username = await user
        .findOne({
          where: { id: accessTokenData.id },
          attributes: ['nickname'],
        })
        .then(data => {
          if (data) {
            return data.dataValues.nickname;
          } else {
            return res.status(404).send('cannot find user');
          }
        });

      return res.status(201).send({
        data: {
          commentInfo: {
            id: createNewComment.dataValues.id,
            userId: accessTokenData.id,
            nickname: username,
            text: createNewComment.dataValues.text,
            created_At: createNewComment.dataValues.createdAt,
            rate: createNewComment.dataValues.rate
              ? createNewComment.dataValues.rate
              : 'not rated',
          },
        },
        message: 'ok',
      });
    }

    return res.status(500).send('err');
  },
};
