---
slug: wsl-mysql-config
title: '윈도우10 우분투에서 MySQL 설정 파일 위치'
tags: [mysql, wsl, linux, ubuntu]
---

Node.js 실습을 하면서 윈도우10에 개발자 설정을 하고, 윈도우 스토어에 있는 우분투를 설치했었다.

CMD에서 `bash` 사용 가능하도록 설정해서 _Visual Studio Code_ 에서 실습을 진행하면서 터미널 창에서 bash를 사용했다.

데이터베이스 실습에 들어가서, MySQL을 설치하는 과정에서 윈도우 버전을 먼저 설치해서 실습하고, 그 다음 리눅스 버전을 모두 설치했는데 실행 오류가 났다.

<!--truncate-->

```shell
$ /etc/init.d/mysql start

- Starting MySQL database server mysqld No directory, logging in with HOME=/                      [fail]
```

```shell
$ mysql

ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' (2)
```

오류 로그를 확인해 보았다.

```shell
cat /var/log/mysql/error.log
```

오류 메시지 중 이런 내용을 발견했다.

```shell
2018-12-10T10:25:00.951106Z 0 [ERROR] Do you already have another mysqld server running on port: 3306 ?
```

MySQL 기본 포트인 3306 포트가 충돌이 나서 실행이 안 되는 것 같았다.

포트 변경은 `my.cnf`에서 port 부분을 변경하면 된다고 한다.

문제는 my.cnf의 경로인데, 처음에는 `/etc/mysql/my.cnf` 파일이 있길래 열어봤는데 아무 내용이 없다.

윈도우에서 설치한 우분투의 MySQL 설정 파일 경로는 `/etc/mysql/mysql.conf.d/mysqld.cnf`이다.

[mysqld] 아래의 port를 3307로 변경하고, 저장.

```shell
$ /etc/init.d/mysql restart

- Stopping MySQL database server mysqld [ OK ]
- Starting MySQL database server mysqld No directory, logging in with HOME=/ [ OK ]
```

아까와 다르게 _OK_ 메시지가 뜨면서 정상적으로 데몬이 켜진다.

끝!
