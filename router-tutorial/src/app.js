import Express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
const __dirname = path.resolve();

const app = Express();
app.set('port', process.env.PORT || 8088);
/**
 * @name morgan
 * @description 클라이언트 요청 정보를 수집하는 미들웨어
 */
app.use(morgan('dev'));
/**
 * @name express.static
 * @description 정적 파일 경로 지정
 */
app.use('/static', Express.static(__dirname + 'public'));

/**
 * @name cookie-parser
 * @description 쿠키 파싱 라이브러리
 */
app.use(cookieParser('jinyqwer1234'));

/**
 * @name express.json
 * @description 클라이언트 JSON 전송시 req.body 파싱
 */
app.use(Express.json());

/**
 * @name express.urlencoded
 * @description 클라이언트 form submit 시 form데이터를 파싱합니다.
 */
app.use(Express.urlencoded({ extended: true }));

/**
 * @name Middleware-Chain
 * @description 미들웨어 체이닝을 통해 연속적으로 미들웨어를 호출 할 수 있습니다.
 */
app.use(
  (req, res, next) => {
    //rea.data를 사용해 미들웨어 간 데이터를 공유합니다.
    req.data = 'Middleware Message';
    console.log('이 미들웨어는 첫 번째로 실행 됩니다.(모든 요청)');
    next();
  },
  (req, res, next) => {
    console.log('이 미들웨어는 두 번째로 실행 됩니다.(모든 요청)');
    next();
  }
);

app.use('/about', (req, res, next) => {
  console.log('이 미들웨어는 /about 요청시 실행 됩니다.');
  next();
});

app.get('/', (req, res) => {
  req.signedCookies;
  res.cookie('cookie-name', 'cookie-value', {
    expires: new Date(Date.now() + 1000000),
    httpOnly: true,
    path: '/',
    signed: true
  });
  res.send(`${req.data}`);
});

app.get('/image', (req, res) => {
  res.sendFile('');
});

app.get('/about/yoshi', (req, res) => {
  res.json({
    name: 'yoshi',
    debut: 1986
  });
});

app.get('/error', (req, res, next) => {
  try {
    throw new Error('error!!'); //고의적인 에러 발생
  } catch (error) {
    next(error);
  }
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/about.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/404.html'));
});

/**Error Middleware */
app.use((err, req, res, next) => {
  console.log(err);
  res.send(200).send(err);
});

app.listen(app.get('port'), () => {
  console.log('express start 🚀');
});
