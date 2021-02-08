const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const sequelize = require('./models').sequelize;
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', 4000);

sequelize
  .sync({ force: false })
  .then(() => console.log('데이터베이스 연결 성공'))
  .catch(err => console.error(err));
//force: true라면 서버 시작 시 테이블 재생성 (테이블 잘못 생성되었을 때, 개발 초기에 사용하자.)
//관계를 추가, 수정 하거나 안에 있는 컬럼들을 바꿀때가 있는데 alter : true 를 줘야한다.
// https://velog.io/@jwisgenius/sequelize-model-sync-%EC%88%98%EC%A0%95%ED%95%98%EA%B8%B0
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  }),
);
app.use(cookieParser());
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

module.exports.app = app;
