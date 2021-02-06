const { content } = require('../../models');
module.exports = {
  post: async (req, res) => {
    //TODO: 글내용 업데이트 로직 작성
    console.log('hello');
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(401).send('invalid token');
    } else if (accessTokenData) {
      const { id } = accessTokenData;
      const contentInfo = await content.findAll({ where: { userId: id } });
      if (!contentInfo) {
        return res.status(204).send('cannot find recipe');
      }
      //! contentInfo 를 배열로 담아서 유저에게 전달. 고민 필요.
      res.status(200).json({ data: { recipes: content } });
    } else {
      res.status(500).send('err');
    }
  },
};
