<!--
 * @Author: yukiball yukiball
 * @Date: 2024-07-08 17:24:52
 * @LastEditors: yukiball yukiball
 * @LastEditTime: 2024-07-15 02:00:53
 * @FilePath: \display\docs\promise\introPromise.md
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
# 简单聊聊

相信大家对 Promise 并不陌生。陌生的人请看阮大佬写的[es6 权威指南 promise](https://es6.ruanyifeng.com/#docs/promise)
Promise 是异步编程的一种解决方案，可以解决曾经回调地狱等问题。
Promise 对象有两个特点。一个是对象的状态不受外界影响。另一个是一旦状态改变，就不会再变，任何时候都可以得到这个结果。
Promise 的实例上拥有很多很多的方法供我们使用，下面我们就来逐步手写一个符合 A+规范和 ES 规范的 Promise:wink:。

# 开始手写

## promise 应该长什么样？

首先我们要知道，除了 then、catch、finally 是定义在 Promise 的原型上的方法以外，其他的所有方法都是静态方法（可以通过 hasOwnProperty 获取下试试看～）。同时他还有三个状态 pending、fulfilled、rejected。知道了这个我们就可以开始搭建 Promise 框架了。

如下所示，我们已经搭建好了一个简易 Promise 框架,这是我们能在浏览器看到的 Promise 原型与实例方法，当我们从控制台看到 promise 的时候能大致的想到 promise 应该是长成下面这个样子的。

```ts
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  constructor(func) {}
  then() {
    console.log("then");
  }
  catch() {
    console.log("catch");
  }
  finally() {
    console.log("finally");
  }
  static resolve() {}
  static reject() {}
  static all() {}
  static race() {}
  static allSettled() {} //ES2020
  static any() {} // ES2021
}
```
