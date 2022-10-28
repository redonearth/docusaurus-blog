---
slug: docusaurus-blog-migration
title: '블로그 이주하다(docusaurus)'
tags: [docusaurus, blog]
---

기존에도 _SSG(Static Site Generator)_ 도구인 [Gatsby](https://www.gatsbyjs.com)로 블로그를 만들었는데, 이번에 [Docusaurus](https://docusaurus.io)로 변경하게 되었다.

<!--truncate-->

## 이주한 이유

Gatsby를 사용하면서 크게 불편한 점은 없었다.

하지만 몇 가지 이유를 나열해보자면

- 최근에 `TypeScript`를 많이 사용하면서 Gatsby Blog에도 TypeScript를 적용해보고 싶었지만, Gatsby 패키지 버전과 다른 라이브러리들의 종속성 때문에 업그레이드가 쉽지 않았다.

- Gatsby가 4 버전까지 출시되었고, 어느새 [5 버전 릴리즈를 앞두고 있다](https://www.gatsbyjs.com/resources/webinars/gatsby-v5)는 점을 감안하면 사용 중인 [블로그 템플릿](https://github.com/JaeYeopHan/gatsby-starter-bee)의 버전이 많이 낮다. (Gatsby v2)

- 이왕 변경하기로 마음먹은 김에 새로운 도구를 사용해보고 싶었다. `yarn berry`도 학습할 겸, 겸사겸사.

## Docusaurus를 선택한 이유

`React Native`를 학습하면서 [공식 문서](https://reactnative.dev)를 봤는데 깔끔한 UI와 굉장히 빠른 동작이 인상적이었고, Docusaurus를 사용하고 있다는 것을 알게 되었다.

이미 다양한 사이트들과 특히 [오픈 소스 공식 문서](https://docusaurus.io/showcase?tags=opensource)의 용도로 많이 사용되고 있다.

또한 `React`를 만든 곳이기도 한 [facebook의 오픈 소스 프로젝트](https://github.com/facebook/docusaurus)라는 점에서 React와의 호환성과 _꾸준한 유지보수_ 를 기대해볼 만하다.

## 앞으로의 계획

블로그를 이주하면서 과거에 작성한 포스팅을 쭉 살펴보니, 개발을 주제로 한 글을 많이 작성하지 않은 것을 반성하게 되었다.

여태까지 회사 일을 해오면서 배운 점들이 적지 않은데 제때 글로 옮겨두지 않은 것이 아쉽다.

글을 조금 더 자주 쓰도록 노력해야겠다.

과거에 티스토리에 작성했던 글도 조금씩 옮겨볼 생각이다.
