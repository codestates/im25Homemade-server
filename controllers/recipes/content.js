const { content, image, sequelize, user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

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

      await image.create({
        name: '임시',
        image_url: req.body.imageUrl,
        order: 0,
        contentId: newContent.dataValues.id,
      });

      res.status(201).send({
        data: { userInfo: newContent.dataValues },
        message: 'ok',
      });
    } else if (!accessTokenData) {
      res.status(401).send('invalid token');
    } else {
      res.status(500).send('err');
    }
  },
};
