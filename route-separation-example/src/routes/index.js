import express from 'express';
const router = express.Router();

//📎 localhost/
router.get('/', (req, res) => {
  res.status(200).send('Express Index!');
});

export default router;
