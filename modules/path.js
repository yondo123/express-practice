const path = require('path');

const filePath = __filename; //현재 파일 경로
const dirPath = __dirname; //현재 디렉토리 경로

console.log(dirPath, filePath);

console.log('Directory :', path.dirname(filePath)); //디렉토리 경로 추출
console.log('Ext :', path.extname(filePath)); //확장자 추출
console.log('Filename :', path.basename(filePath, path.extname(filePath))); //파일명 추출
console.log('Parse :', path.parse(dirPath), path.parse(filePath)); //파일경로 분해 (dir, base, ext, name)

console.log('path.join(): ', path.join(__dirname, 'process.js'));
console.log('path.resolve(): ', path.resolve(__dirname, '/process.js'));
