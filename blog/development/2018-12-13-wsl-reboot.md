---
slug: wsl-reboot
title: '윈도우10에 설치한 Ubuntu Rebooting 방법'
tags: [wsl, linux, ubuntu]
---

WSL은 어떻게 재부팅하지?

<!--truncate-->

해당 [링크](https://superuser.com/questions/1126721/rebooting-ubuntu-on-windows-without-rebooting-windows/1347725)를 참고했다.

윈도우 CMD를 _관리자 권한으로 실행_ (중요!) 하여 아래의 명령어를 입력한다.

```shell
net stop LxssManager
net start LxssManager
```

바로 따라해봤다.

```shell
C:\WINDOWS\system32>net stop LxssManager
LxssManager 서비스를 멈춥니다..
LxssManager 서비스를 잘 멈추었습니다.
```

잘 멈추었다니 재시작 해 주자.

```shell
C:\WINDOWS\system32>net start LxssManager
LxssManager 서비스를 시작합니다..
LxssManager 서비스가 잘 시작되었습니다.
```

음, 잘 되는군.
