# Express Router

## 미들웨어

미들웨어(middleware)는 Express에서 핵심적인 기능 중 하나로, 요청과 응답 사이의 중간(middle)에서 처리됩니다.

### 사용법

`use` 메서드나 `router` 내부에서 미들웨어를 정의할 수 있습니다.

```jsx
//모든 요청에서 미들웨어 실행
app.use((req, res, next)=> {
	console.log('이 미들웨어는 모든 요청에서 기본적으로 실행됩니다.');
	next();
}, (req, res) => {
	// code..
});;

//특정 요청 또는 경로에서 미들웨어 실행 (next 인자는 생략 가능)
app.get(('/', (req, res, next)=>{
	console.log("request get, '/'");
	next();
}, (req, res)=>{
	throw new Error('error!');
});
```

### 연속성

여러 인자에 콜백 함수를 넣어주면 연달아 미들웨어를 사용할 수 있습니다. 미들웨어는 순차적으로 처리되기 때문에 순서에 주의해야 합니다.

```jsx
app.use(
  (req, res, next) => {
    console.log('첫번째 미들웨어!');
    next();
  },
  (req, res, next) => {
    console.log('두번째 미들웨어!');
    next();
  },
  (req, res, next) => {
    console.log('세번째 미들웨어');
    next();
  }
);

app.get('/', (req, res) => {
  console.log('complete!');
});
```

특정 사용자에게 다른 자원을 제공해야 할 때는 아래와 같은 패턴을 사용할 수 있습니다. **(미들웨어 확장)**

```jsx
app.use('/user', (req, res, next) => {
  if (req.session.id) {
    express.static(__dirname, 'assests')(req, res, next);
  } else {
    next();
  }
});
```

### 데이터 공유

전역변수를 사용해서 클라이언트의 데이터를 공유하면 안 됩니다. 대신 미들웨어의 `request` 인수에 값을 저장하면 요청이 끝나기 전까지 서로 다른 미들웨어에서 사용할 수 있습니다.

```jsx
// custom middleware
app.get('/', (req, res, next) => {
  req.data = 'jiny';
  next();
});

// next로 다음 미들웨어로
app.get('/', (req, res) => {
  res.send(`${req.data}`); //jiny
});
```

### 에러 핸들링

에러 사항도 마찬가지로 미들웨어로 핸들링할 수 있습니다. 주의사항으로는 에러 미들웨어는 꼭 인자로 **error, request, response, next** 순서로 받아야 합니다. (사용하지 않더라도, 에러 미들웨어 인식을 위해 꼭 순서를 지켜야 합니다.)

```jsx
app.use((err, req, res, next) => {
  console.error(err);
});
```

### next(’route’)

`next('route')`를 선언하면 해당 라우팅을 건너뛰고 다음 라우팅을 찾습니다.

주로 분기 처리에서 특정 요청에서 건너 뜀이 필요할 때 사용한다.

```jsx
app.get('/', (req, res, next) => {
	if (true) {
		next('route')
	} else {
		next();
	}
}, (req, res) => {
	// code..
}));

app.get('/', (req, res) => {
	// code..
});
```

### NotFound

미들웨어의 특성을 활용하여 NotFound(404) 페이지도 전달할 수 있습니다. 순차적으로 요청을 받지 못한 라우팅은 맨 마지막 미들웨어에서 처리됩니다. 마지막 요청 라우터의 다음 순서에 배치시키면 됩니다.

```jsx
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/views/about.html'));
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/404.html'));
});

/**Error Middleware */
app.use((err, req, res, next) => {
  console.log(err);
  res.send(500).send('error');
});

app.listen(app.get('port'), () => {
  console.log('express start 🚀');
});
```

동적 라우팅을 활용하여 요청 쿼리를 검사하여 수행하는 방법도 있습니다.

```jsx
const redirect404 = (req, res) => {
  res.status(404).send('Bad Request.');
};

//정의한 페이지가 아니라면 'Bad Request.'라는 메시지를 전송한다.
app.get(
  '/page/:name',
  (req, res, next) => {
    const pageName = req.params.name;
    const validPath = ['about', 'admin', 'main'];
    if (validPath.includes(pageName)) {
      res.sendFile(path.join(__dirname, `/public/${pageName}.html`));
    } else {
      next();
    }
  },
  redirect404
);
```

## 유용한 미들웨어

- **morgan:** 요청 정보를 로깅하는 라이브러리입니다. log level을 사용하여 로깅 옵션을 선택할 수 있습니다.

- **cookie-parser:** 쿠키 파싱을 편하게 해주는 미들웨어 라이브러리 입니다.
- **express.json:** 클라이언트 JSON 전송시 req.body 파싱
- **express.urlencoded:** 클라이언트 form submit 요청시 form 데이터를 파싱해주는 미들웨어 입니다.
- **express.static:** 정적인 파일을 제공하는 미들웨어, 요청 경로와 실제 경로를 다르게 하여 보안에도 도움을 주는 미들웨어 입니다.
