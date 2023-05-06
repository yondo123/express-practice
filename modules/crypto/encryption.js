const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(16).toString('hex'); //암호화 key (32바이트)
const iv = crypto.randomBytes(8).toString('hex'); // 초기화 벡터 iv (16바이트)
const password = 'marioworld1985@';

// 암호화
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(password, 'utf-8', 'base64');
encrypted += cipher.final('base64');

console.log(`암호화 : ${encrypted}`);

//복호화
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result = decipher.update(encrypted, 'base64', 'utf-8');
result += decipher.final('utf-8');
console.log(`복호화 : ${result}`);
