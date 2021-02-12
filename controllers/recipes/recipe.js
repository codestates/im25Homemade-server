const cookieParser = require('cookie-parser');
const { content, image, category, user, comment } = require('../../models');
module.exports = {
  get: async (req, res) => {
    // 레시피 목록에서 한개 클릭 시 보이는 로직

    const recipe = await content.findOne({
      where: { id: req.params.id },
    });

    if (recipe === null) {
      return res.status(400).send('cannot find recipe');
    }

    delete recipe.dataValues.updatedAt;

    // 조회수 증가
    await content.update(
      {
        views: recipe.dataValues.views + 1,
      },
      {
        where: { id: req.params.id },
      },
    );

    const images = await image
      .findAll({
        where: { contentId: req.params.id },
        attributes: ['image_url', 'order'],
      })
      .then(data => {
        const sortedImages = [];
        for (let i = 0; i < data.length; i++) {
          sortedImages.push(data[i].dataValues.image_url);
        }
        return sortedImages;
      });

    const categoryName = await category
      .findOne({
        where: { id: recipe.dataValues.categoryId },
      })
      .then(data => data.dataValues.name);

    const users = await user.findOne({
      where: { id: recipe.dataValues.userId },
      attributes: ['id', 'nickname', 'avatar_url'],
    });

    const comments = await comment.findAndCountAll({
      where: { contentId: recipe.dataValues.id },
      attributes: ['id', 'userId', 'text', 'createdAt', 'rate'],
    });

    let sum = 0;
    let evaluator = 0;
    for (let idx = 0; idx < comments.count; idx++) {
      if (comments.rows[idx].dataValues.rate !== null) {
        sum = sum + comments.rows[idx].dataValues.rate;
        evaluator++;
      }
    }

    console.log(comments.rows);

    const returendComments = async () => {
      for (let i = 0; i < comments.rows.length; i++) {
        let userId = comments.rows[i].dataValues.userId;
        let userNick = await user.findOne({
          attributes: ['nickname'],
          where: { id: userId },
        });
        console.log('here is nick');
        console.log(comments.rows.dataValues);
        comments.rows.dataValues.nickname = userNick.dataValues.nickname;
      }
      return comments.rows;
    };

    const resultComments = await returendComments();
    console.log('here is resultComments');
    console.log(resultComments);

    return;

    const rateAvg = sum / evaluator;

    if (recipe) {
      return res.status(200).send({
        data: {
          recipe: {
            id: recipe.dataValues.id,
            userId: users.dataValues.id,
            avatarUrl: users.dataValues.avatar_url,
            username: users.dataValues.nickname,
            title: recipe.dataValues.title,
            content: recipe.dataValues.content,
            thumbnailUrl: recipe.dataValues.thumbnail_url,
            imageUrls: images,
            createdAt: recipe.dataValues.createdAt,
            comments: comments.rows,
            rate: rateAvg,
            views: recipe.dataValues.views,
            categoryName: categoryName,
          },
        },
      });
    }

    return res.status(500).send('err');
  },
};
