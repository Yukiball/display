<!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-14 14:29:30
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-14 22:32:31
 * @FilePath: \display\docs\promise\catch&&finally.md
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
-->

## Promise.prototype.catch()

catch 只处理失败的场景，所以是最简单的

```js
Promise.prototype.catch = function (onReject) {
  return this.then(null, onReject);
};
```

## Promise.prototype.finally()

finally 无论 promise 是什么结果都会执行,并且会继承之前 promise 的状态

```js
Promise.prototype.finally = function (callback) {
  return this.then(
    (data) => {
      callback();
      return data;
    },
    (reason) => {
      callback();
      return reason;
    }
  );
};
```

把这些放到我自己写的 Promise 中呢

```ts
export class MyPromise {
  ……
  constructor(func: (res: any, rej: any) => void) {
    ……
  }
  ……
  catch(onRejected){
    return this.then(null,onRejected)
  }
  finally(callback){
    return this.then((data)=>{
        callback()
        return data;
    },(reason)=>{
        callback()
        throw reason;

    })
  }
}
```
