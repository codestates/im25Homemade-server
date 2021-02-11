const { content, image } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { refreshToken } = require('../tokenFunctions/refreshtokenrequest');

module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 글작성 요청 로직 작성

    if (
      req.body.title &&
      req.body.imageUrl &&
      req.body.thumbnail &&
      req.body.content
    ) {
      const accessTokenData = isAuthorized(req);
      if (!accessTokenData) {
        refreshToken(req, res);
      } else {
        const newContent = await content.create({
          title: req.body.title,
          content: req.body.content,
          thumbnail_url: req.body.thumbnail,
          userId: accessTokenData.id,
          categoryId: req.body.categoryId,
        });

        const imgs = req.body.imageUrl;

        for (let i = 0; i < imgs.length; i++) {
          await image.create({
            name: '임시',
            image_url: imgs[i],
            order: i,
            contentId: newContent.dataValues.id,
          });
        }

        if (!newContent) {
          return res.status(401).send('access token has been tempered');
        }

        return res.status(201).send({
          data: {
            id: newContent.id,
            message: 'created new content successfully',
          },
        });
      }
    }
    res.status(500).send('err');
  },
};
