<!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-15 02:03:56
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-15 23:55:45
 * @FilePath: \display\docs\promise\all&&allSettled.md
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->

## Promise.all

参数为 iterator

1. all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例，这个新 Promise 的状态取决于我们传入参数中 promise 的状态。
2. 数组中参数都是 Promise 实例，如果不是，就会先调 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理
3. all 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
4. 只有参数的状态都变成 fulfilled，新 promise 的状态才会变成 fulfilled,此时参数的返回值组成一个数组，传递给 p 的回调函数。
5. 只要参数之中有一个被 rejected，新 Promise 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函
数作为参数

```js
Promise.all = function (proms) {
  return new Promise((reslove, reject) => {
    try {
      const saveList = [];
      let count = 0;
      let fulfilledCount = 0;
      for (const p of proms) {
        let i = count;
        count++;
        Promise.resolve(p).then((data) => {
          saveList[i] = data;
          fulfilledCount++;
          // 只有参数的状态都变成fulfilled，新promise的状态才会变成fulfilled
          if (fulfilledCount === count) {
            reslove(saveList);
          }
        }, reject);
      }
    } catch (error) {
      reject(error);
      console.error(error);
    }
  });
};
```

## MyPromise.all

放入我的 MyPromise 中

```ts

export class MyPromise {
  ……
  constructor(func: (res: any, rej: any) => void) {
    ……
  }
  ……
  static all(proms: any) {
    return new MyPromise((res, rej) => {
      try {
        const saveArr: any[] = [];
        let count = 0;
        let fulfilledCount = 0;
        for (const p of proms) {
          const i = count;
          count++;
          this.resolve(p).then((data: any) => {
            fulfilledCount++;
            saveArr[i] = data;
            if (count === fulfilledCount) {
              res(saveArr);
            }
          }, rej);
        }
        if (count === 0) {
          res(saveArr);
        }
      } catch (error) {
        rej(error);
        console.error(error);
      }
    });
  }
}
```

## Promise.allSettled

参数为 iterator

等待参数的数组里所有的 Promise 有结果之后，就会返回 Promise 完成，并按照顺序汇总所有结果。该方法会返回的新的 Promise 实例，一旦发生状态变更，状态总是 fulfilled，不会变成 rejected。

```js
Promise.allSettled = function (proms) {
  const saveArr = [];
  for (const p of proms) {
    saveArr.push(
      Promise.resolve(p).then(
        (data) => ({
          state: "fulfilled",
          result: data,
        }),
        (reason) => ({
          state: "rejected",
          result: reason,
        })
      )
    );
  }
  return this.all(saveArr);
};
```

## MyPromise.allSettled

```ts
export class MyPromise {
  ……
  constructor(func: (res: any, rej: any) => void) {
    ……
  }
  ……
  static allSettled(proms: any) {
    const saveArr = [];
    for (const p of proms) {
      saveArr.push(
        this.resolve(p).then(
          (data: any) => ({
            state: FULFILLED,
            result: data,
          }),
          (reason: any) => ({
            state: REJECTED,
            result: reason,
          })
        )
      );
    }
    return this.all(saveArr);
  }
}
```
