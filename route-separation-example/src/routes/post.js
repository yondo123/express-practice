import express from 'express';
const router = express.Router();

// 📎 localhost/naver /Redirect
router.get('/naver', (req, res) => {
  res.redirect('http://naver.com').status(302);
});

router
  .route('/:id')
  // 📎 localhost/${postid} /GET
  .get((req, res) => {
    res.status(200).send(`/GET ${req.params.id}`);
  })
  // 📎 localhost/${postid} /POST
  .post((req, res) => {
    res.status(200).send(`/POST ${req.body.title}, ${req.body.body}`);
  })
  // 📎 localhost/${postid} /DELETE
  .delete((req, res) => {
    res.status(200).send(`/POST ${req.body.title}, ${req.body.body}`);
  });

export default router;
