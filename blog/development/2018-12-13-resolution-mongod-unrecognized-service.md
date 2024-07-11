---
slug: resolution-mongod-unrecognized-service
title: '윈도우10 하위 시스템 우분투에서 mongod: unrecognized service 해결 방법'
tags: [mongodb, wsl, linux, ubuntu, debian]
---

`MongoDB`를 실습하려고 우분투에서 4.0 버전을 설치하고

```shell
sudo service mongod start
```

타이핑 하고 엔터키를 딱 눌렀는데

```shell
mongod: unrecognized service
```

라는 에러를 뱉었다.

<!--truncate-->

저 service라는 명령어는 알아보니 `/etc/init.d`에 해당 파일이 있을 때 동작하는 방식이다.

내 경우엔 `mongod`라는 파일이 존재하지 않았다.

구글링을 하면 _MongoDB를 재설치해라_ , 또는 _`mongod` 대신 `mongodb`를 타이핑해라._ 등의 내용이 대부분이다.

```shell
sudo apt-get purge mongodb-org\*
```

명령으로 삭제하고,

```shell
sudo apt autoremove
```

해 주고,

```shell
sudo rm -r /var/lib/mongodb
sudo rm -r /var/log/mongodb
```

디렉토리 날려주고...

다시 설치를 수십 번 반복.

이래도 안 되니 아래 방법을 시도.

```shell
sudo apt-get install --reinstall mongodb-org
```

하지만 이것 역시 안 됨.

`mongodb`라는 명령어는 MongoDB 2 버전을 깔았을 때 사용하는 커맨드인 듯 했다.

커맨드로 MongoDB를 설치하면 동작하는 것이 당연하다는 듯이 교재에도, 공식 매뉴얼에도 _service 스크립트_ 를 만들어라, 등록해라 이런 내용은 찾아볼 수 없었다.

## init script 등록하기

답답해서 내가 찾아보니 이런 링크가 있었다.

[https://github.com/mongodb/mongo/blob/master/debian/init.d](https://github.com/mongodb/mongo/blob/master/debian/init.d)

데비안 계열의 우분투에서 쓰는 `init script`의 내용이다.

`vim` 에디터를 켜 보자.

```shell
sudo vi /etc/init.d/mongod
```

위 링크의 코드를 _copy and paste_ 하고, `:wq`로 저장 후 나온다.

```shell
cd /etc/init.d
ls -al
```

확인해 보면 방금 생성한 mongod 파일만 색상이 다르다. 권한이 다르다는 뜻이다.

```shell
chmod 755 mongod
```

권한을 다른 파일과 동일하게 설정해 주었다.

그 후,

```shell
# service mongod start
```

또는

```shell
sudo service mongod start
```

라는 명령어를 입력하면

```shell
* Starting database mongod [ OK ]
```

라고 이쁘게 뜬다.

에러 해결!
