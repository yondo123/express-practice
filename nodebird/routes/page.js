const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const twits = [];
    res.render('main', {
        title: '내 정보 - NodeBird',
        twits,
        user: req.user
    });
});

//회원가입
router.get('/join', (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
});

module.exports = router;
