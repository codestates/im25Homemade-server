var express = require('express');
var router = express.Router();

const { usersController } = require('../controllers');

// * GET /users/userinfo 유저정보 요청
router.get('/userinfo', usersController.userinfo.get);

// * GET /users/myrecipes 유저 레시피들 요청
router.get('/myrecipes', usersController.myrecipes.get);

// * GET /users/refreshtokenrequest accesstoken 재발행 요청
router.get('/refreshtokenrequest', usersController.refreshtokenrequest.get);

// * POST /users/signin 유저 로그인
router.post('/signin', usersController.signin.post);

// * POST /users/socialsignin 소셜 로그인
router.post('/socialsignin', usersController.socialsignin.post);

// * POST /users/signout 유저 로그아웃
router.post('/signout', usersController.signout.post);

// * POST /users/signup 유저 회원가입
router.post('/signup', usersController.signup.post);

// * POST /users/ucontent 유저 글 업데이트
router.post('/ucontent', usersController.ucontent.post);

// * POST /users/uuserinfo 유저 정보 업데이트
router.post('/uuserinfo', usersController.uuserinfo.post);

// * POST /users/ucomment 유저 댓글 업데이트
router.post('/ucomment', usersController.ucomment.post);

// * POST /users/duser 유저 탈퇴 요청
router.post('/duser', usersController.duser.post);

module.exports = router;
