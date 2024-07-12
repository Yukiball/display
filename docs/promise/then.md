# promise.then

then 方法可以接受两个回调函数当参数。第一个是 Promise 对象的状态变为 resolved 时调用，第二个是 Promise 对象的状态变为 rejected 时调用。这两个函数都是可选的，不一定要提供。但它们都接受 Promise 对象传出的值作为参数。

[着急看代码总结点这里](#总结)

then 的使用方法有很多种,我们要实现 then 就要满足以下几种使用方式。
:::: code-group
::: code-group-item 基本使用

```ts
let promise = new Promise((res, rej) => {
  res(123);
});
promise.then(
  (value) => {},
  (error) => {}
);
```

:::
::: code-group-item 多次调用

```ts
let promise = new Promise((res, rej) => {
  res(123);
});

promise.then(
  (value) => {},
  (error) => {}
);
promise.then(
  (value) => {},
  (error) => {}
);
```

:::
::: code-group-item 链式调用

```ts
let promise = new Promise((res, rej) => {
  res(123);
});
promise
  .then(
    (value) => {},
    (error) => {}
  )
  .then(
    (value) => {},
    (error) => {}
  );
```

:::
::::

## then 的基础实现

先来简单满足上述的三种使用方法

:::: code-group
::: code-group-item <then 基础实现>

```ts
//  A+规范 onFulfilled和onRejected都是可选参数
//  2.2.1.1 如果onFulfilled不是一个函数，则必须将其忽略。
//  2.2.1.2 如果onRejected不是一个函数，则必须将其忽略。
const FUNC = "function";

class myPromise {
  // ……省略……
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        if (typeof onResolved === FUNC) {
          try {
            const value = onResolved(this.result);
            resolve(value);
          } catch (err) {
            reject(err);
          }
        } else {
          resolve(this.result);
        }
      } else {
        if (typeof onRejected === FUNC) {
          try {
            const error = onRejected(this.result);
            // 只要onRejected执行成功了就需要resolve
            resolve(error);
          } catch (err) {
            reject(err);
          }
        } else {
          reject(this.result);
        }
      }
    });
  }
}
```

:::
::: code-group-item <提炼一下重复代码>

```ts
class myPromise {
  // ……省略……
  private isFunc(cb: any, resolve: any, reject: any) {
    if (typeof cb === FUNC) {
      try {
        const value = cb(this.result);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    } else {
      this.state === FULFILLED ? resolve(this.result) : reject(this.result);
    }
  }
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    });
  }
}
```

:::
::: code-group-item <到目前为止的代码>

```ts
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  private state: string = PENDING;
  private result: any = undefined;
  private resolve: (data: any) => any;
  private reject: (reson: any) => any;
  constructor(func: (res: any, rej: any) => void) {
    this.resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    this.reject = (reson: any) => {
      this.changeState(REJECTED, reson);
    };
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  private changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
    console.log(this.state, this.result);
  }
  private isFunc(cb: any, resolve: any, reject: any) {
    if (typeof cb === FUNC) {
      try {
        const value = cb(this.result);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    } else {
      this.state === FULFILLED ? resolve(this.result) : reject(this.result);
    }
  }
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    });
  }
}
```

:::
::::

::: details 浏览器调试代码，可自行尝试

```ts
let p = new myPromise((res, rej) => {
  res(333);
});
p.then(
  (val: any) => {
    console.log("成功", val);
  },
  (error: any) => {
    console.log("失败", error);
  }
);
p.then(
  (val: any) => {
    console.log("成功1", val);
    return 123;
  },
  (error: any) => {
    console.log("失败1", error);
  }
).then(
  (val: any) => {
    console.log("成功2", val);
  },
  (error: any) => {
    console.log("失败2", error);
  }
);
// 浏览器返回
// 成功 333
// 成功1 333
// 成功2 123
```

:::

## 异步情况实现

到上面为止我们只考虑了同步时 then 的写法，但是开发时大多数情况我们的代码都是异步的，在异步状态下上面这段代码不会起到任何作用（还没有等 promise 状态变更 then 就已经加载完了）。下面我们考虑一下异步情况，假设我们的 promise 如下：

```ts
let p = new Promise((res, rej) => {
  setTimeout(() => {
    res(123);
  });
});
```

我们需要等到 promise 状态从 pending 发生改变时再让 then 方法里面的方法执行。也就是在 changeState 时去执行 the 内部 new myPromise 里面的一系列操作，这就需要我们将传入的 onResolved,onRejected, resolve, reject 存起来。再因为 then 可以多次调用，所以要将传入的值存为一个数组
:::: code-group
::: code-group-item <修改原有方法>

```ts
class myPromise {
  // 增加
  private handler: Array<any> = [];
  // ……省略……
  private changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
    // 异步情况走这里
    this.doSomeThing();
  }
  private isFunc(cb: any, resolve: any, reject: any) {
    if (typeof cb === FUNC) {
      try {
        const value = cb(this.result);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    } else {
      this.state === FULFILLED ? resolve(this.result) : reject(this.result);
    }
  }
  private doSomeThing() {
    if (this.state === PENDING) return;
    while (this.handler.length) {
      const { onResolved, onRejected, resolve, reject } = this.handler.shift();
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    }
  }
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      this.handler.push({ onResolved, onRejected, resolve, reject });
      // 同步情况直接这里
      this.doSomeThing();
    });
  }
}
```

:::
::: code-group-item <到目前为止的代码>

```ts
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const FUNC = "function";

export class myPromise {
  private state: string = PENDING;
  private result: any = undefined;
  private handler: Array<any> = [];
  private resolve: (data: any) => any;
  private reject: (reson: any) => any;
  constructor(func: (res: any, rej: any) => void) {
    this.resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    this.reject = (reson: any) => {
      this.changeState(REJECTED, reson);
    };
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  private changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
    // 异步情况走这里
    this.doSomeThing();
  }
  private isFunc(cb: any, resolve: any, reject: any) {
    if (typeof cb === FUNC) {
      // 回调是函数的时候
      try {
        const value = cb(this.result);
        resolve(value);
      } catch (error) {
        reject(error);
      }
    } else {
      // 回调不是函数的时候
      this.state === FULFILLED ? resolve(this.result) : reject(this.result);
    }
  }
  private doSomeThing() {
    if (this.state === PENDING) return;
    while (this.handler.length) {
      const { onResolved, onRejected, resolve, reject } = this.handler.shift();
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    }
  }
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      this.handler.push({ onResolved, onRejected, resolve, reject });
      // 同步情况直接这里
      this.doSomeThing();
    });
  }
}
```

:::
::::

## 当 then 里面传入的是一个 promise

想知道传入的是不是 promise 就需要一个函数来判断，根据 promise 的 A+规范我们可以知道“promise 是一个具有 then 方法的对象或函数”，根据这句话我们就可以写出判断函数

```ts
private isPromiseLike(fn: any) {
    return (
      fn !== null &&
      (typeof fn === "function" || typeof fn === "object") &&
      typeof fn.then === "function"
    );
  }

// 修改isFunc
private isFunc(cb: any, resolve: any, reject: any) {
    if (typeof cb === FUNC) {
      // 回调是函数的时候
      try {
        const value = cb(this.result);
      if(this.isPromiseLike(value)){
          value(resolve,reject)
      }else{
        resolve(value);
      }
      } catch (error) {
        reject(error);
      }
    } else {
      // 回调不是函数的时候
      this.state === FULFILLED ? resolve(this.result) : reject(this.result);
    }
  }
```

## 总结

最后，我们将 then PENDING 和 FUlFILLED 时的方法都放到一个微任务里面里面执行就可以了

```ts
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const FUNC = "function";

export class myPromise {
  private state: string = PENDING;
  private result: any = undefined;
  private handler: Array<any> = [];
  private resolve: (data: any) => any;
  private reject: (reson: any) => any;
  constructor(func: (res: any, rej: any) => void) {
    this.resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    this.reject = (reson: any) => {
      this.changeState(REJECTED, reson);
    };
    try {
      func(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  private changeState(state: string, result: any) {
    if (this.state !== PENDING) return;
    this.state = state;
    this.result = result;
    // 异步情况走这里
    this.doSomeThing();
  }
  private isFunc(cb: any, resolve: any, reject: any) {
    queueMicrotask(() => {
      if (typeof cb === FUNC) {
        try {
          const value = cb(this.result);
          if (this.isPromiseLike(value)) {
            value.then(resolve, reject);
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        // 对应的回调不是函数的时候
        this.state === FULFILLED ? resolve(this.result) : reject(this.result);
      }
    });
  }
  private isPromiseLike(fn: any) {
    return (
      fn !== null &&
      (typeof fn === "function" || typeof fn === "object") &&
      typeof fn.then === "function"
    );
  }
  private doSomeThing() {
    if (this.state === PENDING) return;
    while (this.handler.length) {
      const { onResolved, onRejected, resolve, reject } = this.handler.shift();
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    }
  }
  then(onResolved: any, onRejected: any) {
    return new myPromise((resolve: any, reject: any) => {
      this.handler.push({ onResolved, onRejected, resolve, reject });
      // 同步情况直接这里
      this.doSomeThing();
    });
  }
}
```
