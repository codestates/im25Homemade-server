const { comment } = require('../../models');
module.exports = {
  delete: async (req, res) => {
    //TODO: 레시피 댓글 삭제 요청 로직 작성
    if (req.headers.authorization) {
      await comment.destroy({
        where: { id: req.body.id },
      });
    } else if (!req.headers.authorization) {
      res.status(401).send('invalid token');
    }
    res.send(err);
  },
};
