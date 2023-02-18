const crypto = require('crypto');

const password = 'marioworld1985@';

/**
 * @description
 * salt: 비밀번호에 적용할 salt, salt는 임의의 문자열로 같은 비밀번호를 가진 사용자들의 해시값이 서로 달라지도록 하는 데 사용한다.
 * iterations: 해시 값을 생성할 때 반복 횟수(높을 수록 안전)
 * keylen: 생성된 해시 값의 길이
 * digest: 사용할 해시 함수 (기본값: sha1)
 */
crypto.randomBytes(64, (err, buf) => {
    //랜덤한 salt 생성
    const salt = buf.toString('base64');
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
        console.log('암호화 비밀번호: ', key.toString('base64'), '\n', '원본 비밀번호: ', password);
    });
});
