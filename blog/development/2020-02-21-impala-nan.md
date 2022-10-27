---
slug: impala-nan
title: 'Impala에서 NaN(Not a Number) 처리 방법'
tags: [database, impala, hadoop, query, sql]
---

현재 진행 중인 프로젝트에서 표에 평균값을 표시하는 화면을 구현 중이었다.

하나의 칸이 `NaN`으로 표시되길래, 원인을 추적했다.

<!--truncate-->

해당 컬럼의 데이터 타입은 `FLOAT`이다. 그 컬럼에서 수백 개의 데이터 중 딱 하나가 `NaN`으로 들어가 있었다.

내가 해결한 방법은 Impala의 내장 함수 중 `IS_NAN`을 사용했다.

<https://docs.cloudera.com/runtime/7.0.3/impala-sql-reference/topics/impala-math-functions.html#math_functions__is_nan>

_NaN_ 이 있으면 `true`, 없으면 `false`를 반환한다.

이것을 이용해서, NaN이 포함되어 있으면 `0`을, 없으면 `원래 값`을 출력했다.

```sql
# 예제 쿼리
SELECT DECODE(IS_NAN(superman), true, 0, superman)
FROM crypton
```

끗.
