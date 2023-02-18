const os = require('os');

console.log('✅ OS Info');
console.log('Architecture : ', os.arch());
console.log('OS Platform  : ', os.platform());
console.log('OS Type      :', os.type());
console.log('OS Run Time  : ', os.uptime());
console.log('Host Name    :', os.hostname());
console.log('OS Ver.      :', os.release());

console.log('📂 Path');
console.log('Home Directory Path: ', os.homedir());
console.log('Temp Directory Path: ', os.tmpdir());

const memeory = os.freemem();
console.log('CPU : ', os.cpus());
console.log('Memory : ', memeory);
console.log('사용 가능한 메모리 : ', `${memeory / 1024 / 1024} mb`);
console.log('전체 메모리 :', `${os.totalmem() / 1024 / 1024 / 1024} gb`);
