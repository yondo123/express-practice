# Express

`express` 프레임워크를 설치하여 실행 환경을 구성합니다.

## node script 설정

서버 작업시 on/off를 번거롭게 하지 않도록 `nodemon` 실행 스크립트를 설정합니다.

```json
{
	...
  "scripts": {
    "start": "nodemon src/app.js"
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

## 설치 하기

```bash
npm i -D nodemon
npm i express
```

## 기본 예제

```
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    └── views
        ├── about.html
        └── home.html
```

```jsx
import Express from 'express';
import path from 'path';
const __dirname = path.resolve();

const app = Express();
app.set('port', process.env.PORT || 8088);

app.get('/', (req, res) => {
  res.send('express test');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/about.html'));
});

app.listen(app.get('port'), () => {
  console.log('express start 🚀');
});
```

- **app.set():** express 설정 값을 저장할 수 있습니다. 사용하려면 `app.get()`으로 값을 가져올 수 있습니다.
- **app.get():** HTTP GET 요청 라우팅 메서드입니다. 마찬가지로 **post, put, delete** 등 기본적인 HTTP 메서드도 지원합니다. 요청 객체와 응답 객체를 인자로 사용할 수 있습니다.

- **response.send():** HTTP 응답을 클라이언트에게 전송합니다. (버퍼, 객체, 문자열, 배열 등을 전달할 수 있습니다.)
  ```jsx
  res.send(Buffer.from('whoop'));
  res.send({ some: 'json' });
  res.send('<p>some html</p>');
  res.status(404).send('Sorry, we cannot find that!');
  res.status(500).send({ error: 'something blew up' });
  ```
- **response.sendFile(path, router)**: 지정된 경로에서 리소스 파일을 전달합니다.
  ```js
  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/views/about.html'));
  });
  ```

## 서버 실행

```bash
npm start
```
