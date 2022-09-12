const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router();

//회원가입
router.post('/join', async function (req, res, next) {
    const { email, nick, password } = req.body;
    try {
        //기존 회원시 에러페이지 redirect
        const existUser = await User.findOne({ where: { email } });
        if (existUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//로그인
router.post('/login', function (req, res, next) {
    //strategy 파일에서 done함수 호출 시 콜백함수로 전달받아 수정된다.
    passport.authenticate('loacal', function (authError, user, info) {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }

        return req.login(user, function (loginError) {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

//로그아웃
router.get('/logout', function (req, res) {
    req.logOut();
    req.session.destroy(); //세션쿠키 제거
    req.redirect('/');
});
module.exports = router;
