const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const passport = require('passport');
//로그인 상태 체크
const { loginState, notLoginState } = require('./middlewares');

const router = express.Router();

//회원가입
router.post('/join', notLoginState, async function (req, res, next) {
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
router.post('/login', notLoginState, function (req, res, next) {
    //strategy 파일에서 done함수 호출 시 콜백함수로 전달받아 수정된다.
    passport.authenticate('local', function (authError, user, info) {
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
router.get('/logout', loginState, function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(); //세션쿠키 제거
        res.redirect('/');
    });
});

//카카오 로그인
router.get('/kakao', passport.authenticate('kakao'));

//카카오 로그인 콜백
router.get(
    '/kakao/callback',
    //로그인 성공
    passport.authenticate('kakao', {
        failureRedirect: '/'
    }),
    //로그인 실패
    function (req, res) {
        res.redirect('/');
    }
);
module.exports = router;
