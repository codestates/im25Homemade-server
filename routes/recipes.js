var express = require('express');
var router = express.Router();

const { recipesController } = require('../controllers');

// * GET /recipes/recipes 모든 레시피
router.get('/recipes:searchWord', recipesController.recipes.get);

// * GET /recipes/recipe/id 레시피 상세정보
router.get('/recipe/:id', recipesController.recipe.get);

// * POST /recipes/content 레시피 글작성
router.post('/content', recipesController.content.post);

// * POST /recipes/dcontent 레시피 글 삭제
router.delete('/dcontent', recipesController.dcontent.delete);

// * POST /recipes/comment 레시피 댓글 작성
router.post('/comment', recipesController.comment.post);

// * POST /recipes/dcomment 레시피 댓글 삭제
router.delete('/dcomment', recipesController.dcomment.delete);

module.exports = router;

// app.use('/users', usersRouter);
// app.use('/recipes', recipesRouter);
