---
slug: resolution-bcrypt-install-error
title: '윈도우10 WSL에서 bcrypt 설치 오류 해결 방법'
tags: [nodejs, npm, bcrypt, wsl, linux, ubuntu]
---

윈도우10 WSL 환경에서 Node.js 실습을 진행하고 있었다.

암호화 패키지인 `bcrypt`를 설치할 때 아래처럼 오류가 발생하였다.

<!--truncate-->

```shell
$ sudo npm i bcrypt
> bcrypt@3.0.3 install /mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt
> node-pre-gyp install --fallback-to-build
node-pre-gyp WARN Using needle for node-pre-gyp https download
node-pre-gyp WARN Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v3.0.3/bcrypt_lib-v3.0.3-node-v64-linux-x64-glibc.tar.gz
node-pre-gyp WARN Pre-built binaries not found for bcrypt@3.0.3 and node@10.14.2 (node-v64 ABI, glibc) (falling back to source compile with node-gyp)
gyp ERR! build error
gyp ERR! stack Error: not found: make
gyp ERR! stack     at getNotFoundError (/usr/lib/node_modules/npm/node_modules/which/which.js:13:12)
gyp ERR! stack     at F (/usr/lib/node_modules/npm/node_modules/which/which.js:68:19)
gyp ERR! stack     at E (/usr/lib/node_modules/npm/node_modules/which/which.js:80:29)
gyp ERR! stack     at /usr/lib/node_modules/npm/node_modules/which/which.js:89:16
gyp ERR! stack     at /usr/lib/node_modules/npm/node_modules/isexe/index.js:42:5
gyp ERR! stack     at /usr/lib/node_modules/npm/node_modules/isexe/mode.js:8:5
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:154:21)
gyp ERR! System Linux 4.4.0-17134-Microsoft
gyp ERR! command "/usr/bin/node" "/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "build" "--fallback-to-build" "--module=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding/bcrypt_lib.node" "--module_name=bcrypt_lib" "--module_path=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding" "--napi_version=3" "--node_abi_napi=napi" "--napi_build_version=0" "--node_napi_label=node-v64"
gyp ERR! cwd /mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt
gyp ERR! node -v v10.14.2
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
node-pre-gyp ERR! build error
node-pre-gyp ERR! stack Error: Failed to execute '/usr/bin/node /usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js build --fallback-to-build --module=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding/bcrypt_lib.node --module_name=bcrypt_lib --module_path=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding --napi_version=3 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v64' (1)
node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/node_modules/node-pre-gyp/lib/util/compile.js:83:29)
node-pre-gyp ERR! stack     at ChildProcess.emit (events.js:182:13)
node-pre-gyp ERR! stack     at maybeClose (internal/child_process.js:962:16)
node-pre-gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:251:5)
node-pre-gyp ERR! System Linux 4.4.0-17134-Microsoft
node-pre-gyp ERR! command "/usr/bin/node" "/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/node_modules/.bin/node-pre-gyp" "install" "--fallback-to-build"
node-pre-gyp ERR! cwd /mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt
node-pre-gyp ERR! node -v v10.14.2
node-pre-gyp ERR! node-pre-gyp -v v0.12.0
node-pre-gyp ERR! not ok
Failed to execute '/usr/bin/node /usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js build --fallback-to-build --module=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding/bcrypt_lib.node --module_name=bcrypt_lib --module_path=/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding --napi_version=3 --node_abi_napi=napi --napi_build_version=0 --node_napi_label=node-v64' (1)
npm WARN nodebird@0.0.1 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! bcrypt@3.0.3 install: `node-pre-gyp install --fallback-to-build`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the bcrypt@3.0.3 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
npm ERR!     /home/jipro/.npm/_logs/2018-12-26T13_06_58_125Z-debug.log
```

구글링을 해 본 결과 여러가지 해결법이 존재하였지만, 전혀 먹히지 않았다.

내 경우의 해결법은 의외로 간단했다.

<https://www.npmjs.com/package/bcrypt#if-you-are-submitting-bugsissues>

> First, make sure that the version of node you are using is a stable version.

Node.js의 버전을 _안정 버전(stable)_ 으로 설치하면 된다.

```shell
$ sudo npm i bcrypt

> bcrypt@3.0.3 install /mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt
> node-pre-gyp install --fallback-to-build

node-pre-gyp WARN Using needle for node-pre-gyp https download
[bcrypt] Success: "/mnt/c/Users/Jipro/workspace/nodejs-book/ch9/9.3/nodebird/node_modules/bcrypt/lib/binding/bcrypt_lib.node" is installed via remote
npm WARN nodebird@0.0.1 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

+ bcrypt@3.0.3
added 71 packages from 49 contributors and audited 2640 packages in 22.783s
found 0 vulnerabilities
```

설치가 잘 되었다.

끝!
