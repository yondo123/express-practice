const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = function () {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email', //req.body.email
                passwordField: 'password' //req.body.password
            },
            async function (email, password, done) {
                //usernameFeild, passwordField 값과 일치해야한다.
                try {
                    const existUser = await User.findOne({ where: { email } });

                    if (existUser) {
                        //비밀번호 검증
                        const result = await bcrypt.compare(password, existUser.password);
                        if (result) {
                            done(null, existUser);
                        } else {
                            //done (server 처리내용,  전달객체, 메시지)
                            done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                        }
                    } else {
                        done(null, false, { message: '가입되지 않은 회원입니다.' });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
