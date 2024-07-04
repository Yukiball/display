# 手写 Promise

## Promise 简介

相信大家对 Promise 并不陌生。陌生的人请看阮大佬写的[es6 权威指南 promise](https://es6.ruanyifeng.com/#docs/promise)
Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个符合 A+规范的 Promise:wink:。

## 开始手写

### promise 应该长什么样？

首先我们要知道，除了 then、catch、finally 是定义在 Promise 的原型上的方法以外，其他的所有方法都是它的实例方法（可以通过 hasOwnProperty 获取下试试看～）。知道了这个我们就可以开始搭建 Promise 框架了。

如下所示，我们已经搭建好了一个简易 Promise 框架,这是我们能在浏览器看到的 Promise 原型与实例方法，当我们从控制台看到 promise 的时候能大致的想到 promise 应该是长成下面这个样子的。

```ts
class myPromise {
  private resolve: any;
  private reject: any;
  private all: any;
  private race: any;
  private allSettled: any; //ES2020
  private any: any; // ES2021
  constructor() {
    this.resolve = null;
    this.reject = null;
    this.all = null;
    this.race = null;
    this.allSettled = null;
    this.any = null;
  }
  then() {
    console.log("then");
  }
  catch() {
    console.log("catch");
  }
  finally() {
    console.log("finally");
  }
}
```

同时他还有三个状态 pending、fulfilled、rejected。了解这些我们就可以开始写了~

### 创建 myPromise 实例

promise 的基础用法就是 new Promise 传入一个 function 以后，将结果值作为参数放入 resolve，reject。

```ts
const promise = new Promise((resolve, reject) => {
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

下面我们就开始模拟这段代码的实现

```ts
// 首先定义promise的三个状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  private state: string = PENDING;
  private result: any = undefined;
  private resolve: (data: any) => any;
  private reject: (reson: any) => any;
  constructor(func: (res: () => {}, rej: () => {}) => void) {
    this.resolve = (data: any) => {
      //A+规定当promise实现时不得过渡到任何其他状态，必须有一个状态，并且该值不能改变
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.result = data;
    };
    this.reject = (reson: any) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.result = reson;
    };
    func(this.resolve, this.reject);
    console.log(this.state, this.result);
  }
}
```

当我们在控制台输入

```ts
new Promise(() => {
  throw Error;
});
```

控制台会返回

```ts
Promise {<rejected>: ƒ}
[[Prototype]]: Promise
[[PromiseState]]: "rejected"
[[PromiseResult]]: ƒ Error()
```

所以报错是对 promise 的状态有影响的，我们要让 promise 监听到报错并改变状态，同时我们再提炼一下改变状态的公共方法。

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
}
```

::: tip 思考：异步错误会不会影响到 promise 的状态呢？
:thinking:

```ts
new Promise((res, rej) => {
  setTimeout(() => {
    throw Error;
  });
});
```

:::

::: details 点击查看控制台输出

```ts
[[Prototype]]: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
```

所以原生 promise 也不能监听到异步的错误，只会再浏览器中抛错并维持 pending 状态，所以在 promise 中使用异步调用时要注意哦！:innocent:
:::

### promise.then

Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。

```ts
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  }
);
```
then方法可以接受两个回调函数当参数。第一个是Promise对象的状态变为resolved时调用，第二个是Promise对象的状态变为rejected时调用。这两个函数都是可选的，不一定要提供。但它们都接受Promise对象传出的值作为参数。

