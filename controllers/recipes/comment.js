const { comment, content } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 댓글 작성 요청 로직 작성
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      refreshToken(req, res);
    } else {
      const createNewComment = await comment.create({
        text: req.body.text,
        userId: accessTokenData.id,
        contentId: req.body.id,
      });

      if (!createNewComment) {
        return res.status(401).send('access token has benn tempered');
      }

      if (req.body.rate) {
        const rates = await content.findOne({
          where: { id: req.body.id },
          attributes: ['rate'],
        });

        await content.update(
          {
            rate: rates.dataValues.rate + req.body.rate,
          },
          {
            where: { id: req.body.id },
          },
        );
      }
      return res.status(201).send({
        data: { commentInfo: createNewComment.dataValues },
        message: 'ok',
      });
    }
  },
};
