const { comment } = require('../../models');
const jwt = require('jsonwebtoken');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 댓글 작성 요청 로직 작성
    if (req.headers.authorization) {
      const tokencode = req.headers.authorization.split(' ')[1];
      const token = await jwt.verify(tokencode, process.env.ACCESS_SECERET);

      const createNewComment = await comment.create({
        text: req.body.text,
        userId: token.id,
        contentId: req.body.contentId,
      });
      res.send(201).send({
        data: { commentInfo: createNewComment.dataValues },
        message: 'ok',
      });
    } else if (!req.headers.authorization) {
      res.status(401).send('invalid token');
    }
    res.status(500).send(err);
  },
};
