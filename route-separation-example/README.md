# Router 심화

## Router 모듈화

일반적으로 웹 애플리케이션에서는 수많은 요청과 응답을 주고 받습니다. 만약 `app.js`내에서 모든 라우팅 API를 한번에 작성한다면 기능 확장과 유지보수가 힘들어질 수 밖에 없습니다. Express에서는 미들웨어를 활용해 라우터를 분리시킬 수 있습니다.

### 라우터 분리하기

일반적으로 `/routes`라는 디렉토리에 라우터 코드들을 분리시킬 수 있습니다. 각각 요청 기능에 맞게 라우터를 분리시키고, 최상위 파일에서 미들웨어를 통해 결합시킬 수 있습니다.

```
root
├── app.js
├── routes
│   ├── index.js
│   ├── post.js
│   └── user.js
└── views
    ├── about.html
    └── home.html
```

```jsx
//📂src/app.js
import indexRouter from './routes/index.js';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';

app.use('/', indexRouter); //기본 웹 페이지 요청을 반환
app.use('/user', userRouter); // user/의 경로 요청
app.use('/post', postRouter); // post/의 경로 요청
```

```jsx
// 📂src/routes/user.js

import express from 'express';
import path from 'path';

const __dirname = path.resolve() + '/src';
const router = express.Router();

// 📎 localhost/user
router.get('/', (req, res) => {
  res.status(200).send('User Response');
});

// 📎 localhost/user/about
router.get('/about', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'views/about.html'));
});

// 📎 localhost/user/[...rest]
router.get('/:userId', (req, res) => {
  res.status(200).send(`요청하신 id는 ${req.params.userId} 입니다.`);
});

export default router;
```

주의 사항으로는 동적 매개변수를 취급하는 라우트나 와일드카드 라우트는 반드시 명확한 경로를 가진 라우트 뒤에 위치해야 합니다.

## 동적 매개변수 라우팅

`:id` 경로를 통해 request 객체의 [params.id](http://params.id/) 값으로 받아올 수 있습니다. id는 예시이며 원하는 파라미터 값으로 설정할 수 있습니다.

```jsx
router.get('/:userId', (req, res) => {
  res.status(200).send(`요청하신 id는 ${req.params.userId} 입니다.`);
});
```

## Querystring

쿼리 문자열이 발생한 경우, `req.query` 객체를 사용하여 쿼리 문자열을 확인할 수 있습니다.

```jsx
// 📎 http://localhost:8088/user?id=jiny&password=1234
router.get('/', (req, res) => {
  if (Object.keys(req.query).length) {
    console.log(req.query);
    //{ id: 'jiny', password: '1234' }
  }
  res.status(200).send('User Response');
});
```

## Route 그룹화

동일한 경로지만, HTTP 메서드만 별개로 지정할 경우, `router.route` 메서드를 통해 그룹화할 수 있습니다.

```jsx
import express from 'express';
const router = express.Router();

router
  .route('/:id')
  // 📎 localhost/${postid} /GET
  .get((req, res) => {
    res.status(200).send(`/GET ${req.params.id}`);
  })
  // 📎 localhost/${postid} /POST
  .post((req, res) => {
    res.status(200).send(`/POST ${req.body.title}, ${req.body.body}`);
  })
  // 📎 localhost/${postid} /DELETE
  .delete((req, res) => {
    res.status(200).send(`/POST ${req.body.title}, ${req.body.body}`);
  });

export default router;
```

## Request, Response

요청&응답시에 Express에서 제공하는 여러 객체 속성등을 통해 API 라우팅에 활용할 수 있습니다. 주의 사항으로는 다음과 같습니다.

- 응답은 단일 응답으로 설계해야 합니다.
- request와 response 메서드는 메서드 체이닝을 제공합니다.

### Request

- req.app: req 객체를 통해 app 객체에 접근이 가능합니다.
- req.body: 요청 본문 객체 입니다.
- req.cookies: cookie-parser 미들웨어가 생성한 쿠키 요청의 정보를 담고 있습니다.
- req.ip: 요청 ip 주소
- req.params: 동적 라우트 매개변수에 대한 정보를 담고 있습니다.
- req.query: 쿼리스트링 정보를 갖고 있습니다. {key: value..}
- req.get(”header name”): 헤더 정보를 가져올 수 있습니다.

### Response

- res.app: req.app과 마찬가지로 res 객체를 통해 app 객체에 접근합니다.
- res.cookie(key, value, option): 쿠키를 설정합니다.
- res.clearCookie(key, value, option): 쿠키를 제거합니다.
- res.end(): 데이터 없이 응답을 전송합니다.
- res.json({}): json 형태의 응답을 전송합니다.
- res.redirect(url): redirect
  ```jsx
  // 📎 localhost/naver /Redirect
  router.get('/naver', (req, res) => {
    res.redirect('http://naver.com').status(302);
  });
  ```
- res.send(data): 데이터와 함께 응답을 전송합니다. (text, html, buffer, object, array)
- res.sendFile(path): 정적 파일을 전송합니다.
- res.set(header, value): 응답 헤더를 설정합니다. (content-type/Application 등)
- res.status(status code): 응답 HTTP 상태 코드를 설정합니다.
