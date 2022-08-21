const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const pageRouter = require('./routes/page');
const { sequelize } = require('./models/index.js');

dotenv.config();

/** Express 설정 */
const app = express();
app.set('port', process.env.DEV_PORT || 8081);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true
});

/**DB 연결 */
sequelize
    .sync({ force: false })
    .then(function () {
        console.log('🗄️ database connection success!');
    })
    .catch(function (err) {
        console.log(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_PRIKEY));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_PRIKEY,
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);

/** Router 설정 */
app.use('/', pageRouter);

//잘못된 요청
app.use(function (req, res, next) {
    const error = new Error(`METHOD : ${req.method}, REQ :${req.url} BAD REQUEST`);
    error.status = 404;
    next(error);
});

//에러 미들웨어
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.ENVIROMENT == 'dev' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), function () {
    console.log(`${app.get('port')}👻 Server boot`);
});
