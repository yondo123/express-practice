const crypto = require('crypto');

const password = 'marioworld1985@';
/**
 * @description
 * createHash: 해시 알고리즘 (sha1, sha256, sha512), 상대적으로 sha512 해시 알고리즘이 안전하다.
 * update: 변환 할 문자열
 * digist: 인코딩할 알고리즘 (base64, hex, latin1..), base64가 가장 짧아서 많이 사용한다.
 */
const sha512hash = crypto.createHash('sha512').update(password).digest('base64');
const sha1hash = crypto.createHash('sha1').update(password).digest('base64');

console.log('Origin :', password, '\n', 'SHA-512 HASH:', sha512hash);
console.log('Origin :', password, '\n', 'SHA-512 HASH:', sha1hash);
