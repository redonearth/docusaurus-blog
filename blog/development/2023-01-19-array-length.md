---
slug: array-length
title: 'Array.length'
tags: [javascript]
---

자바스크립트의 `Array.length`는 참 많이 쓰는 속성이다.

프로젝트를 하다가 새로 알게 된 지식을 정리하려고 한다.

<!--truncate-->

## 배열 길이 변경

`length` 속성에 값을 설정하게 되면, 배열의 길이를 변경할 수 있다.

```js
const menu = ['pizza', 'chicken', 'jokbal', 'budaejjigae', 'samgyeopsal', 'gganpunggi'];
console.log(`메뉴 개수 : ${menu.length}개`); // 메뉴 개수 : 6개

menu.length = 0;
console.log(`메뉴 개수 : ${menu.length}개`); // 메뉴 개수 : 0개
```

## 배열 단축

예를 들어 데이터를 5개만 보여주고 싶을 경우, 이것을 활용할 수 있다.

```js
const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
if (data.length > 5) {
  data.length = 5;
}

console.log(data); // [10, 20, 30, 40, 50]
console.log(data.length); // 5
```
