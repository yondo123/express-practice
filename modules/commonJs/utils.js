/**
 * @desc: commonJS 방식을 활용한 모듈 예제
 */

const calAdd = (a, b) => {
    return a + b;
};

const calSubstract = (a, b) => {
    return a - b;
};

module.exports = {
    calAdd,
    calSubstract
};
