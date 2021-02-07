const { content, image } = require('../../models');
const jwt = require('jsonwebtoken');
module.exports = {
  post: async (req, res) => {
    //TODO: 레시피 글작성 요청 로직 작성

    if (req.headers.authorization) {
      const tokencode = req.headers.authorization.split(' ')[1];
      const token = await jwt.verify(tokencode, process.env.ACCESS_SECERET);

      const newContent = await content.create({
        title: req.body.title,
        content: req.body.content,
        rate: 0,
        rateCount: 0,
        views: 0,
        thumbnail_url: 'multer',
        userId: token.id,
        categoryId: req.body.categoryId,
      });

      await image.create({
        name: req.body.name,
        image_url: req.body.image_url,
        order: req.body.order,
        contentId: newContent.dataValues.id,
      });

      res.status(201).send({
        data: { userInfo: newContent.dataValues },
        message: 'ok',
      });
    } else if (!req.headers.authorization) {
      res.status(401).send('invalid token');
    }
    res.status(500).send(err);
  },
};
