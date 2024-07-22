# 创建 myPromise 实例

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
  #resolve: (data: any) => any;
  #reject: (reson: any) => any;
  constructor(func: (res: () => {}, rej: () => {}) => void) {
    this.#resolve = (data: any) => {
      //A+规定当promise实现时不得过渡到任何其他状态，必须有一个状态，并且该值不能改变
      if (this.state !== PENDING) return;
      this.state = FULFILLED;
      this.result = data;
    };
    this.#reject = (reson: any) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.result = reson;
    };
    func(this.#resolve, this.#reject);
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
  #resolve: (data: any) => any;
  #reject: (reson: any) => any;
  constructor(func: (res: any, rej: any) => void) {
    this.#resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    this.#reject = (reson: any) => {
      this.changeState(REJECTED, reson);
    };
    try {
      func(this.#resolve, this.#reject);
    } catch (error) {
      this.#reject(error);
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

::: details 点击查看控制台输出答案

```ts
[[Prototype]]: Promise
[[PromiseState]]: "pending"
[[PromiseResult]]: undefined
```

所以原生 promise 也不能监听到异步的错误，只会再浏览器中抛错并维持 pending 状态，所以在 promise 中使用异步调用时要注意哦！:innocent:
:::

