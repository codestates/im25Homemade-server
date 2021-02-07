const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  delete: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    //TODO: 레시피 댓글 삭제 요청 로직 작성
    if (accessTokenData) {
      await comment.destroy({
        where: { id: req.body.id },
      });
    } else if (!accessTokenData) {
      res.status(401).send('invalid token');
    }
    res.send(err);
  },
};
