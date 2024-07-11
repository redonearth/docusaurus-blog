---
slug: react-native-text가-넘칠-때-해결-방법
title: '[React Native] Text가 넘칠 때 해결 방법'
tags: [reactnative]
---

## 서론

React Native를 개발하다보면 `Text`가 종종 제대로 _줄 바꿈_ 이 되지 않고 화면 밖으로 넘칠 때가 있다.

나 또한 그랬다.

<!--truncate-->

## 현상

프로젝트는 이런 구조이며, `Column`이 `Title`을 감싸고 있는 부모 요소이다.

```jsx
const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  // ...생략
`;

export default function Detail() {
  return (
    <Container>
      <Header>
        <Background />
        <Column>
          <Poster />
          <Title>{title}</Title>
        </Column>
      </Header>
      <Overview>{overview}</Overview>
    </Container>
  );
}
```

![rn1](./images/rn-text1.png)

## 고민

처음에는 '`width`를 _70%_ 로 줄이면 어떻게 될까?'라고 생각해서 수정해봤다.

```jsx
const Column = styled.View`
  width: 70%; // 80%에서 줄이기
`;
```

![rn2](./images/rn-text2.png)

폭이 줄어들면서 해결은 되지만, 다른 형제 요소와 맞물렸을 때 70%이라는 기준이 명확하지 않은 숫자가 마음에 들지 않았다.

## 해결 방법

구글링을 하다가 [좋은 글](https://www.bam.tech/article/why-my-text-is-going-off-screen)을 발견했다.

부모 요소가 아니라 해당 요소에 `flex: 1` 속성을 주는 것이다.

`flex: 1`은

```css
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;
```

즉, `flex: 1 1 0;`과 같다.

해당 현상의 경우 `flex-shrink`만 영향을 주기 때문에 정확히 `flex-shrink: 1`만 주어도 충분하다.

그리고 부모 요소인 `Column`의 _width_ 를 제거해주면 원하는 모습으로 해결된다.

![rn2](./images/rn-text2.png)
