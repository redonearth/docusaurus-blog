---
slug: axios-cors
title: 'CORS에서는 Axios가 좋다 (HTTP Client)'
tags: [http]
---

CORS 문제를 해결하다가 알게 된 사실.

<!--truncate-->

**Vue.js** 2 버전을 사용하고 있는 프로젝트에서 iframe으로 기능을 구현하려고 (iframe은 너무 극혐이지만 회사 프로젝트라서 어쩔 수 없다. 까라면 까야...) [vue-friendly-iframe](https://github.com/officert/vue-friendly-iframe) 라이브러리와 NginX 리버스 프록시까지 적용하며 하나씩 퀘스트를 헤쳐 나가던 중이었다.

`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` 등등 온갖 액세스를 허용하기에 이르렀으니.

가능한 모든 편법을 동원해 드디어 화면에 렌더링되는 iframe의 내용물. 😭

하지만 기쁨도 잠시, 다시 API의 Post 요청 후 받아든 에러들의 문턱을 넘지 못했다.

아무런 의심없이 내장 Fetch API를 사용하고 있었는데 `Response`로 내려주는 내용에서

```js
{
  type: 'cors',
  headers: {},
  ...
}
```

분명 필요한 헤더를 `Access-Control-Expose-Headers`에 추가해줬음에도 headers의 내용이 비어있다??

며칠을 끙끙대다가, 혹시나 해서 fetch 요청 코드를 [Axios](https://axios-http.com/kr/)로 교체해봤더니 원했던 headers의 응답 내용은 물론이며 fetch로 요청했을 땐 볼 수 없었던 추가적인 응답 내용들이 함께 보였다.

### 먼저 작성했던 fetch 코드

```js
async createTicket() {
  try {
    const { status, headers } = await fetch({
      method: 'POST',
      url: `${this.iframeUrl}/######/##/########`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.userData),
    });

    if (status === 201) {
      const { ticket } = headers;
      if (ticket) {
        return ticket;
      }
    }
  } catch (error) {
    console.warn(error);
  }
},
```

### Axios 코드

`axios.js`

```js
// Vue instance property에 정의
import axios from 'axios';

export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
```

```js
async createTicket() {
  try {
    const { status, headers } = await this.$axios({
      method: 'post',
      url: `${this.iframeUrl}/######/##/########`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: this.userData,
    });

    if (status === 201) {
      const { ticket } = headers;
      if (ticket) {
        return ticket;
      }
    }
  } catch (error) {
    console.warn(error);
  }
},
```

여기서,

```js
const { status, headers } = await this.$axios({
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
  },
  url: `${this.iframeUrl}/######/##/########`,
  data: this.userData,
});
```

이 부분을 이렇게 작성할 수도 있다.

```js
const { status, headers } = await this.$axios.post(`${this.iframeUrl}/######/##/########`, this.userData);
```

## Fetch와 Axios는 비슷하지만 다르다

Fetch와 Axios는 문법에서도 비슷하지만 다른 부분이 꽤 있음을 알 수 있다.

Fetch에서 `body`에 해당하는 부분은 Axios에서는 `data`로 전달하며, fetch와 달리 `JSON stringify`가 필요없고 자동으로 문자열로 변환해준다. 또한, Fetch에는 없는 *요청 메소드*를 Axios에서 제공한다.

참고로, 원래 HTTP request `method`는 대소문자를 구별하기 때문에 *대문자*로 작성하는 것이 정확하다고 한다.

`GET`, `POST`, `PUT`, `DELETE`, ...

[HTTP Method Name is Case Sensitive - Developer Note](https://www.wilianto.com/http-method-name-is-case-sensitive)

[RFC 7231](https://www.rfc-editor.org/rfc/rfc7231#section-4.1)

Axios는 편리하게 타입스크립트로 대/소문자 모두 작성 가능하도록 정의해두었다.

```bash
node_modules
└─ axios
    └─ index.d.ts
```

<!-- prettier-ignore -->
```ts
export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'
```

## 결론

Axios에 관한 내용을 구글링해보면 거의 사용 편의성이나 약간의 기능 차이 정도만 설명하고 있어서 평소에는 fetch로도 대부분의 API 요청을 처리하는데 문제가 없기 때문에 당연하게 fetch만 사용하고 있었다.

`CORS`라는 특수한 환경에서 이렇게 막강한 능력을 발휘할 줄은 몰랐다. 이래서 써드파티 라이브러리를 사용하는구나 싶었다. 같은 역할을 하지만 다양한 도구들이 끊임없이 개발되는 이유 중의 하나가 아닐까 싶다. 코드를 작성할 때 한 가지 방법만 고수하지 않고 여러 가지 도구들을 비교하면 좋을 것 같다. (막상 바쁘면 필요할 때 하겠지 😂)

그 외 Fetch와 Axios의 기능 비교에 관한 글은 아래를 참고하면 좋을 것 같다.

[`[번역] 입문자를 위한 Axios vs Fetch`](https://velog.io/@eunbinn/Axios-vs-Fetch#fetch%EC%99%80-axios%EC%9D%98-%EA%B8%B0%EB%8A%A5-%EB%B9%84%EA%B5%90)
