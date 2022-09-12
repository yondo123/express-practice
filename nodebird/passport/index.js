const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy.js');
const User = require('../models/user');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id); //세션 userId저장
    });

    //passport.session()으로 세션 값 전달
    passport.deserializeUser(function (id, done) {
        //로그인 사용자 식별
        User.findOne({ where: { id } })
            .then(function (user) {
                done(null, user); //req에 user 속성 저장
            })
            .catch(function (error) {
                done(error);
            });
    });

    //전략파일 등록
    local();
    kakao();
};
