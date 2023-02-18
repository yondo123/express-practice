const { calAdd, calSubstract } = require('./utils');
const checkNumber = require('./checkNumber');

console.log(checkNumber('1'), checkNumber(10));
console.log(calAdd(1, 2)); //3
console.log(calSubstract(2, 1)); //1
