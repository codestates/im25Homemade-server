const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 댓글 작성 요청 로직 작성
    const accessTokenData = isAuthorized(req);

    if (accessTokenData) {
      const createNewComment = await comment.create({
        text: req.body.text,
        userId: accessTokenData.id,
        contentId: req.body.contentId,
      });
      res.send(201).send({
        data: { commentInfo: createNewComment.dataValues },
        message: 'ok',
      });
    } else if (!accessTokenData) {
      res.status(401).send('invalid token');
    } else {
      res.status(500).send(err);
    }
  },
};
