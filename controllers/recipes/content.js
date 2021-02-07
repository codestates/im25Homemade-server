const { content, image, sequelize } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 글작성 요청 로직 작성

    const accessTokenData = isAuthorized(req);

    if (accessTokenData) {
      const newContent = await content.create({
        title: req.body.title,
        content: req.body.content,
        rate: 0,
        views: 0,
        thumbnail_url: 'multer',
        userId: accessTokenData.id,
        categoryId: req.body.categoryId,
      });
      // multer 코드 미구현되어 아직 이미지 업로드 불가
      await image.create({
        name: '임시',
        image_url: '임시',
        order: 0,
        contentId: newContent.dataValues.id,
      });

      res.status(201).send({
        data: { userInfo: newContent.dataValues },
        message: 'ok',
      });
    } else if (!accessTokenData) {
      res.status(401).send('invalid token');
    }
    res.status(500).send(err);
  },
};
