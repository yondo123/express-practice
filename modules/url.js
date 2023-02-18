const myGithubUrl = new URL('https://github.com/yondo123/express-practice');
const retormallUrl = new URL('https://retromall.com/product?category=xbox&year=2023&year=2022&product=1234');

console.log(myGithubUrl, myGithubUrl.toString()); //객체 구조, URL 문자열 변환

console.log(retormallUrl.searchParams.getAll('year')); //특정 param 조회(여러개) ['2023', '2022']
console.log(retormallUrl.searchParams.get('category')); //특정 param 조회
console.log(retormallUrl.searchParams.has('product')); //특정 param 판별 (true)
console.log(retormallUrl.searchParams.keys(), retormallUrl.searchParams.values()); //url param key&value 조회

retormallUrl.searchParams.append('name', 'xbox360'); //param 추가

/**기본 URL 구조 */
// URL {
//   href: 'https://github.com/yondo123/express-practice',
//   origin: 'https://github.com',
//   protocol: 'https:',
//   username: '',
//   password: '',
//   host: 'github.com',
//   hostname: 'github.com',
//   port: '',
//   pathname: '/yondo123/express-practice',
//   search: '',
//   searchParams: URLSearchParams {},
//   hash: ''
// }
