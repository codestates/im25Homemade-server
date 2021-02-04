var express = require('express');
var router = express.Router();

const { recipesController } = require('../controller');

// * GET /recipes/recipes 모든 레시피
router.get('/recipes', recipesController.recipes.get);

// * GET /recipes/recipe/id 레시피 상세정보
router.get('/recipe', recipesController.recipe.get);

// * POST /recipes/content 레시피 글작성
router.post('/content', recipesController.content.post);

// * POST /recipes/dcontent 레시피 글 삭제
router.post('/dcontent', recipesController.dcontent.post);

// * POST /recipes/comment 레시피 댓글 작성
router.post('/comment', recipesController.comment.post);

// * POST /recipes/dcomment 레시피 댓글 삭제
router.post('/dcomment', recipesController.dcomment.post);

module.exports = router;

// app.use('/users', usersRouter);
// app.use('/recipes', recipesRouter);
