---
slug: backtick-and-code-formatter
title: '[ES6] Backtick과 Code Formatter(Prettier)'
tags: [javascript, es6, prettier]
---

ES2015(ES6)에서 [템플릿 리터럴](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)에 사용하는 **백틱** 표현식은 대부분의 상황에서 매우 편리하다.

문자열과 자바스크립트 변수를 결합할 때 대부분 백틱을 사용해서 코드를 작성하고 있는데 일부 코드에서 에러가 발생했고, 해결해가면서 백틱의 특징을 조금 더 알 수 있었다.

<!--truncate-->

## 백틱은 화면에 입력한 그대로 표현된다?

백틱의 특성 중 하나는 백틱 내에 입력한 문자열은 _공백_ 과 _개행_ 까지 그대로 표현되는 것이다. 이러한 특징은 마치 HTML의 [pre 태그](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)와 비슷하다.

따라서 특정 상황에서는 예상치 못한 결과가 나오기도 했다.

## 예제 코드

개인적인 프로젝트에서 Code Formatter인 [Prettier](https://prettier.io/)를 사용하고 있다.

문의하기 페이지의 Form에서 휴대폰 번호를 처리하는 코드의 일부를 예제로 가져왔다.

> 예시로 사용할 전화번호는 _010-1234-5678_ 이다.

아래와 같은 `String`을 Form으로 전송하려고 한다.

```json
{
  "phone": "010-1234-5678"
}
```

### 1번 예제 ('+' 연산자를 사용한 문자열 결합)

```javascript
let request = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);

// 010-1234-5678
```

### 2번 예제 (백틱 문법)

_백틱_ 으로 작성한다면 이러한 코드가 될 것이다.

```javascript
let request = `${phoneNumber.substr(0, 3)}-${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6)}`;

// 010-1234-5678
```

Prettier의 `printWidth` 값에 의해 자동 개행으로 코드를 다듬어주기 때문이다.

### 3번 예제 (백틱 사용과 개행)

또는 가독성을 위해 백틱을 열어두고 다음 행부터 작성하기도 한다.

```js
let request = `
  ${phoneNumber.substr(0, 3)}-${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6)}
`;
```

---

## Code Formatter의 자동 개행 처리에 의한 오류

2번과 3번의 예제처럼 백틱을 적용한 코드를 formatting 할 경우, Prettier가 `printWidth` 옵션(기본값 80)에 따라 자동으로 처리하기 때문에 예측하기 어려울 수 있다.
여기에서 백틱의 특징 때문에 문제가 발생할 수 있다.

백틱을 사용한 코드에 Prettier를 적용하면 아래처럼 formatting 된다.

### 한 줄로 입력한 경우

```javascript
// prettier-ignore
let request = `${phoneNumber.substr(0, 3)}-${phoneNumber.substr(
  3,
  3
)}-${phoneNumber.substr(6)}`;

// 010-1234
// -5678
```

---

일반적으로 코드를 작성할 때 가독성을 위해 indent(들여쓰기)를 추가하고, `String`을 작성하는 방법을 많이 사용한다.

이 경우에도 백틱을 사용하여 입력한 `String` 데이터를 보내야 할 때 문제가 발생할 수 있다.

### A. 백틱을 열고 indent를 추가하여 입력한 경우

```javascript
// prettier-ignore
let request = `
  ${phoneNumber.substr(0, 3)}-${phoneNumber.substr(3, 3)}-${phoneNumber.substr(
  6
)}
`;

// (공백 2자) 010-1234
// -5678
```

### B. 백틱 사이를 열고 입력한 경우

가독성을 위해 들여쓰기를 추가하고 `String`을 작성했다.

```javascript
// prettier-ignore
let request = `
  ${phoneNumber.substr(0, 3)}
  -
  ${phoneNumber.substr(3, 3)}
  -
  ${phoneNumber.substr(6)}
`;

// (공백 2자) 010
// (공백 2자) -
// (공백 2자) 1234
// (공백 2자) -
// (공백 2자) 5678
```

개행(또는 공백)의 위치에 따라 Prettier를 사용하면 다양한 형태로 formatting 될 수 있다.

이러한 결과 때문에 `form` 내의 `input` 또는 `textarea`의 String 값을 보낼 때는 주의가 필요하다.

필요에 따라 **정규표현식**이나 JavaScript의 `trim()`, `concat()` 등의 **String 메소드** 또는 `join()` 같은 **Array 메소드** 등을 적절히 사용해서 해결하면 된다.
