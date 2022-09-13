const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = function () {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_TOKEN,
                callbackURL: '/auth/kakao/callback' //developers.kakao > 카카오 로그인 > Redirect URL 설정 값
            },
            async function (accessToken, refreshToken, profile, done) {
                console.log('kakao profile', profile);
                try {
                    const existUser = await User.findOne({ where: { snsId: profile.id, provider: 'kakao' } });

                    if (existUser) {
                        done(null, existUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account_eamil,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: 'kaako'
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
