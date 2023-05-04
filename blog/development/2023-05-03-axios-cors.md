---
slug: axios-cors
title: 'CORS에서는 Axios가 좋다 (HTTP Client)'
tags: [http]
---

CORS 문제를 해결하다가 알게 된 사실.

<!--truncate-->

iframe으로 기능을 구현하려고 NginX 리버스 프록시까지 적용하며 하나씩 퀘스트를 깨 가던 중...

`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 등등 온갖 액세스를 허용하기에 이르렀으니.

가능한 모든 편법을 동원해 드디어 화면에 렌더링되는 iframe의 내용물. 😭

하지만 기쁨도 잠시.

다시 API의 Post 요청의 문턱을 넘지 못했다.

아무런 의심없이 내장 Fetch API를 사용하고 있었는데 `Response`로 내려주는 내용에서

```js
{
  type: 'cors',
  headers: {},
  ...
}
```

분명 필요한 헤더를 `Access-Control-Expose-Headers`에 추가해줬음에도 headers의 내용이 비어있다??

며칠을 끙끙대다가, 혹시나 해서 fetch 요청 코드를 Axios로 교체해봤더니 원했던 headers의 응답은 물론이며 fetch로 요청했을 땐 볼 수 없었던 추가적인 응답 내용들이 함께 보였다.

## fetch와 Axios는 다르다

Axios에 관한 내용을 구글링해보면 거의 사용 편의성이나 약간의 기능 차이 정도만 설명하고 있어서 평소에는 fetch로도 대부분의 API 요청을 처리하는데 문제가 없기 때문에 당연하게 fetch만 사용하고 있었다.

`CORS`라는 특수한 환경에서 이렇게 막강한 능력을 발휘할 줄은 몰랐다.

이래서 써드파티 라이브러리를 사용하는구나 싶었다.

그 외 Fetch와 Axios의 기능 비교에 관한 글은 아래를 참고하면 좋을 것 같다.

[`[번역] 입문자를 위한 Axios vs Fetch`](https://velog.io/@eunbinn/Axios-vs-Fetch#fetch%EC%99%80-axios%EC%9D%98-%EA%B8%B0%EB%8A%A5-%EB%B9%84%EA%B5%90)
