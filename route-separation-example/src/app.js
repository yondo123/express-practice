import Express from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';
import path from 'path';

const __dirname = path.resolve() + '/src';
const app = Express();

app.set('port', process.env.PORT || 8088);
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/**Router 분리 */
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

//404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

//500
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log('express start 🚀');
});
