---
slug: element-style-unit
title: '[JS] Element style에는 단위를 꼭 붙여주자'
tags: [javascript]
---

회사 프로젝트에서 `Vue.js(Vue 2)`와 `JavaScript ES6+`를 사용하고 있다.

상당한 코드에서 혼재되어 있는 `jQuery`를 걷어내는 작업을 하다가 알게 된 내용을 적어본다.

## jQuery를 걷어내보자

Vue를 사용하고 있으니 jQuery를 사용할 이유가 없을 것 같았다. 따라서 jQuery스러운 코드가 조금이라도 보이면 모조리 걷어내고 싶어졌다.

이미 작성되어있던 플러그인의 내용 중 스크롤 이벤트가 동작하는 코드를 찾았다.

```js
$(window).on('scroll', function () {
  $('.box').css({ top: ($(window).scrollTop() / 2) * -1 });
});
```

### 코드 해석: jQuery

1. `window` 객체를 scroll(스크롤)할 때 👉 _스크롤 이벤트 발생_
2. 함수를 실행한다. 👉 _어떤 함수를?_
3. `.box` 엘리먼트의 css 값을 바꾼다. 👉 _어떻게?_
4. top에 **window의 스크롤 위치를 구해서 2로 나눈 값에 -1을 곱한다.**

jQuery와 동일한 로직을 순수 자바스크립트로 아래와 같이 작성했다.

```javascript
const boxElem = document.querySelector('.box');

window.addEventListener('scroll', () => {
  boxElem.style.top = (window.scrollY / 2) * -1;
});
```

### 코드 해석: JavaScript

1. `boxElem` 상수에 `.box`를 넣어준다.
2. `window` 객체에 **scroll 이벤트를 추가**한다.
3. 스크롤 이벤트가 발생하면 **함수를 실행**한다. 👉 _어떤 함수를?_
4. `boxElem`의 style 속성의 top 값을 '**window의 스크롤 위치를 구해서 2로 나눈 값에 -1을 곱한다.**'로 변경한다.

> ...? 하지만, 위 코드는 동작하지 않는다.

---

### jQuery의 CSS API

jQuery API 문서 중 [.css()](https://api.jquery.com/css/)를 찾아봤다.

문서 중간쯤에 이러한 내용이 있다.

> When a number is passed as the value, jQuery will convert it to a string and add `px` to the end of that string. If the property requires units other than `px`, convert the value to a string and add the appropriate units before calling the method.

내용인 즉, jQuery에서는 숫자값이 들어오면 **자동으로 `px`(픽셀) 단위를 붙여준다**는 말이다.

따라서 jQuery는 `px`이나 `rem` 따위의 **단위(unit)**를 넣지 않았음에도 기본값인 px를 붙여주기 때문에 작동하는 것이고, 바닐라 자바스크립트로 새로 작성한 코드가 작동하지 않았던 이유는 **단위를 누락**했기 때문이었다.

### Element style에는 단위를 꼭 붙여주자

다시 위의 코드로 돌아가서,

```js
boxElem.style.top = `${(window.scrollY / 2) * -1}px
```

마지막에 `px` 단위를 추가해줬다.

```js
const boxElem = document.querySelector('.box');

window.addEventListener('scroll', () => {
  boxElem.style.top = `${(window.scrollY / 2) * -1}px`;
});
```

이제 정상적으로 동작하는 것을 확인했다 😊
