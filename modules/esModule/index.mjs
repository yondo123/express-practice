import { add, substract } from './utils.mjs';
import check from './checkNumber.mjs';

const filePath = import.meta.url;
console.log(filePath); //Use __filename Alternate
console.log(add(1, 2)); //3
console.log(substract(2, 1)); //1
console.log(check('1'), check(2)); //'1', 2
