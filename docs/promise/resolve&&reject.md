<!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-14 20:19:53
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-14 22:31:30
 * @FilePath: \display\docs\promise\resolve&&reject.md
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->

## Promise.resolve

resolve 是静态方法，其实例化对象不可调用该方法，只有类本身，以及其子类可以调用。
返回值是一个已完成的 promise。

写 resolve 需要考虑三点

1. 传递的 data 本来就是 promise 对象
1. 传递的 data 是 promiseLike,返回新的 Promise，状态和其保持一致
1. 传递的 data 是其他

```js
function isPromiseLike(data) {
  return !!(
    data !== null &&
    (typeof data === "object" || typeof data === "function") &&
    typeof data.then === "function"
  );
}
Promise.resolve = function (data) {
  if (data instanceof Promise) {
    return data;
  }
  return new Promise((resolve, reject) => {
    if (isPromiseLike(data)) {
      data.then(resolve, reject);
    } else {
      resolve(data);
    }
  });
};
```

## MyPromise.resolve

把方法放到我们自己写的 MyPromise 中

```ts
export class MyPromise {
  ……
  constructor(func: (res: any, rej: any) => void) {
    ……
  }
  ……
  static resolve(data){
    if(data instanceof MyPromise){
        return data
    }
    return new MyPromise((res,rej)=>{
        if(data !== null &&
        (typeof data === "object" || typeof data === "function") &&
        typeof data.then === "function"){
            data.then(res,rej)
        }else{
            res(data)
        }
    })
  }
}
```

## Promise.reject

reject 就十分简单了，不用考虑那么多，直接抛出去就好。

```js
Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
```

## MyPromise.reject

把方法放到我们自己写的 MyPromise 中

```ts
export class MyPromise {
  ……
  constructor(func: (res: any, rej: any) => void) {
    ……
  }
  ……
  static reject(reason){
    return new MyPromise((res,rej)=>{
        rej(reason)
    })
  }
}
```
