import express from 'express';
import path from 'path';

const __dirname = path.resolve() + '/src';
const router = express.Router();

// 📎 localhost/user
router.get('/', (req, res) => {
  if (Object.keys(req.query).length) {
    console.log(req.query);
  }
  res.status(200).send('User Response');
});

// 📎 localhost/user/about
router.get('/about', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views/about.html'));
});

// 📎 localhost/user/[...rest]
router.get('/:userId', (req, res) => {
  res.status(200).send(`요청하신 id는 ${req.params.userId} 입니다.`);
});

export default router;
