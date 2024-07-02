# 手写 Promise

## Promise 简介

相信大家对 Promise 并不陌生。

Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。

Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个 Promise。

## 开始手写:wink:
### 搭框架
首先我们要知道，除了then、catch、finally是Promise的原型方法以外，其他的所有方法都是它的实例方法。知道了这个我们就可以开始搭建Promise框架了。

如下所示，我们已经搭建好了一个简易Promise框架。后面所有的改动都将在这个框架上面去填充。
```ts
class myPromise {
  resolve: any;
  reject: any;
  all: any;
  race: any;
  allSettled: any; //ES2020
  any: any; // ES2021
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