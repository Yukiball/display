<!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-18 12:10:55
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-22 11:22:36
 * @FilePath: \display\docs\promise\any.md
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
## 介绍

any 方法与 all 方法类似，区别就是只要参数之中有一个被 resolve，新 Promise 的状态就变成 resolve，此时第一个被 resolve 的实例的返回值，会传递给新 promise 的回调函数作为参数。只有参数的状态都变成 rejected，新 promise 的状态才会变成 rejected,此时参数的返回值是一个 AggregateError（为了 any 新增的），传递给 p 的回调函数。

```js
Promise.any = function (any) {
  return new Promise((reslove, reject) => {
    let count = 0;
    let rejectCount = 0;
    const saveArr = [];
    try {
      for (let p of any) {
        const i = count;
        count++;
        this.reslove(p).then(resolve, (rej) => {
          rejectCount++;
          saveArr[i] = rej;
          if (rejectCount === count) {
            reject(new AggregateError(saveArr, "All promises were rejected"));
          }
        });
      }
    } catch (err) {
      reject(new AggregateError([err], "All promises were rejected"));
    }
  });
};
```
把这些放到我自己写的 Promise 中呢
```ts
static any(proms: Iterable<any>) {
    return new MyPromise((resolve, reject) => {
      const saveArr: Array<any> = [];
      let count = 0;
      let rejectCount = 0;
      try {
        for (const p of proms) {
          const i = count;
          count++;
          this.resolve(p).then(resolve, (reason: any) => {
            saveArr[i] = reason;
            rejectCount++;
            if (rejectCount === count) {
              reject(new AggregateError(saveArr, "All promises were rejected"));
            }
          });
        }
      } catch (error) {
        reject(new AggregateError([error], "All promises were rejected"));
      }
    });
  }
```
