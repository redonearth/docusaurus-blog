---
slug: remove-pushed-files-in-gitignore
title: push된 .gitignore 파일 제거하기
tags: [git]
---

`.gitignore` 파일은 root 디렉토리에 추가해서 `git`으로 관리하고 싶지 않은(tracking 하지 않을) 파일을 정의하는 파일이다.

때로는 이미 원격 저장소에 업로드한 파일을 나중에 무시하고 싶은 경우가 있다.

<!--truncate-->

이 경우에는 `.gitignore`를 수정해서 `git push`해도 원격 저장소에 업로드된 파일은 사라지지 않는다.

### 원격 저장소에서 .gitignore 적용하기

```bash
git rm -r --cached .
git add .
git commit -m "[.gitignore 적용]"
git push
```
