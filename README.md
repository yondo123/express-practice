# Express 시작하기

## 설치 하기

```bash
npm i -D nodemon #모니터링 라이브러리
npm i express
```

### node script 설정

서버 작업시 on/off를 번거롭게 하지 않도록 `nodemon` 실행 스크립트를 설정합니다.

```json
{
	...
  "scripts": {
    "start": "nodemon --watch src/app.js"
  },
  "keywords": [],
  "devDependencies": {
    "nodemon": "^2.0.22"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```


[**내장 모듈**](https://github.com/yondo123/express-practice/tree/node-modules)  
Node.js에서 기본적으로 제공하는 내장 모듈에 대한 예제입니다.

[**Express**](https://github.com/yondo123/express-practice/tree/express)  
Express 프레임워크를 설치하고 실행하는 방법과 간단한 요청 예제입니다.
