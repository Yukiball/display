# Promise/A+

一个由实施者制定、服务于实施者的、健全的、可互操作的 JavaScript 承诺的开放标准。

Promise表示异步操作的最终结果。与 Promise 交互的主要方式是通过其方法，该方法then注册回调以接收 Promise 的最终值或无法实现 Promise 的原因。

本规范详细说明了该方法的行为then，提供了可互操作的基础，所有符合 Promises/A+ 规范的 Promise 实现都可以依赖该基础来提供。因此，该规范应被视为非常稳定。尽管 Promises/A+ 组织可能会偶尔修改本规范，进行微小的向后兼容更改以解决新发现的极端情况，但我们只会在仔细考虑、讨论和测试后才集成大型或向后不兼容的更改。

从历史上看，Promises/A+ 澄清了早期Promises/A 提案的行为条款，将其扩展至涵盖事实上的行为并省略了未明确或有问题的部分。

最后，核心 Promises/A+ 规范不涉及如何创建、履行或拒绝承诺，而是选择专注于提供可互操作的then方法。未来配套规范的工作可能会涉及这些主题。

## 术语
- “promise” 是一个具有then方法的对象或函数，其行为符合本规范。
- “thenable” 是定义方法的对象或函数then。
- “value” 是任何合法的 JavaScript 值（包括undefined，thenable 或 promise）。
- “exception” 是使用语句抛出的值throw。
- “reason”是表示承诺被拒绝的原因的值。

## 要求
### promise状态
承诺必须处于以下三种状态之一：pending, fulfilled, 或 rejected.。

- 当处于待处理状态时，承诺：
  - 可能会转变为已完成状态或已拒绝状态。
- 当承诺实现时：
  - 不得过渡到任何其他状态。
  - 必须有一个值，并且该值不能改变。
- 当被拒绝时，承诺：
  - 不得过渡到任何其他状态。
  - 必有其理由，且该理由不可改变。
这里的“不得改变”是指不可变的身份（即===），但并不意味着深度的不变性。

### 方法then​
承诺必须提供一种then方法来访问其当前或最终的价值或原因。

承诺的then方法接受两个参数：
``` ts
promise.then(onFulfilled, onRejected)
```
1. onFulfilled和onRejected都是可选参数：
  - 如果onFulfilled不是一个函数，则必须将其忽略。
  - 如果onRejected不是一个函数，则必须将其忽略。
2. 如果onFulfilled是一个函数：
  - 它必须在promise完成后被调用，并以promise的值作为其第一个参数。
  - promise在完成之前不能调用它。
  - 它不能被调用多次。
3. 如果onRejected是一个函数
  - 它必须在promise被拒绝后被调用，并以promise的原因作为其第一个参数。
  - promise在被拒绝之前一定不能调用它。
  - 它不能被调用多次。
4. onFulfilled或者在执行上下文堆栈仅包含平台代码onRejected之前不得调用。[ 笔记1 ]。
5. onFulfilled并且onRejected必须作为函数调用（即没有this值）。[ 笔记2 ]
6. then可能会在同一个承诺上被多次调用。
  - 如果/当promise满足时，所有相应的onFulfilled回调必须按照它们最初调用的顺序执行then。
  - 如果/当promise被拒绝时，所有相应的onRejected回调必须按照它们最初调用的顺序执行then。
7. then必须返回一个承诺[ 笔记3 ]。
```ts
promise2 = promise1.then(onFulfilled, onRejected);
```
  - 如果onFulfilled或之一onRejected返回值x，则运行 Promise Resolution Procedure [[Resolve]](promise2, x)。
  - 如果onFulfilled或onRejected抛出异常e，则必须以作为原因而promise2被拒绝。e
  - 如果onFulfilled不是函数且promise1已满足，则promise2必须以与 相同的值来满足promise1。
  - 如果onRejected不是一个函数并且promise1被拒绝，则promise2必须以与 相同的原因被拒绝promise1。

### 承诺解决程序
承诺解析过程是一个抽象操作，以承诺和值作为输入，我们将其表示为[[Resolve]](promise, x)。如果x是一个可然后执行的，它会尝试采用promise的状态x，假设 的x行为至少有点像承诺。否则，它会promise以 的值来实现x。

这种 thenable 处理方式允许 Promises 实现互操作，只要它们公开符合 Promises/A+ 要求的then方法即可。它还允许 Promises/A+ 实现使用合理的then方法“吸收”不符合要求的实现。

要运行[[Resolve]](promise, x)，请执行以下步骤：

1. 如果promise和x指的是同一个对象，promise则以aTypeError为理由拒绝。
2. 如果x是一个承诺，则采用其状态 [ 笔记4 ]：
  - 如果x处于待处理状态，则promise必须保持待处理状态直到x完成或被拒绝。
  - 如果/当x满足时，promise以相同的值满足。
  - 如果/当x被拒绝时，promise以相同的理由拒绝。
3. 否则，如果x是对象或函数，
  - 设then为x.then。[ 笔记5 ]
  - 如果检索属性x.then导致抛出异常e，则拒绝promise并e给出原因。
  - 如果then是函数，则使用xas this、第一个参数resolvePromise和第二个参数调用它rejectPromise，其中：
    - 如果/当resolvePromise使用值调用时y，运行[[Resolve]](promise, y)。
    - 如果/当rejectPromise有理由被调用时r，则promise用拒绝r。
    - 如果同时调用resolvePromise和rejectPromise，或者对同一参数进行多次调用，则第一个调用优先，并且任何后续调用都将被忽略。
    - 如果调用then引发异常e
      - 如果resolvePromise或rejectPromise已被调用，请忽略它。
      - 否则，promise以e作为理由拒绝。
  - 如果then不是函数，则promise用 来满足x。
4. 如果x不是对象或函数，则promise用 来实现x。

如果使用参与循环 thenable 链的 thenable 解析了 Promise，这样[[Resolve]](promise, thenable)finally 的递归性质会导致[[Resolve]](promise, thenable)再次调用，则遵循上述算法将导致无限递归。鼓励但不要求实现检测此类递归并promise以信息TypeError为理由拒绝。[ 笔记6 ]



## 笔记
1. 此处的“平台代码”是指引擎、环境和 Promise 实现代码。实际上，此要求可确保onFulfilled和onRejected异步执行，在调用的事件循环轮次之后then，使用新的堆栈。这可以通过“宏任务”机制（例如setTimeout或setImmediate）或“微任务”机制（例如MutationObserver或 ）来实现process.nextTick。由于 Promise 实现被视为平台代码，因此它本身可能包含一个任务调度队列或“蹦床”，其中调用处理程序。

2. 也就是说，在严格模式下this它将位于undefined它们内部；在松散模式下它将是全局对象。

3. 只要实现满足所有要求，实现就可以允许promise2 === promise1。每个实现都应记录它是否可以生成promise2 === promise1以及在什么条件下可以生成。

4. 通常，只有当承诺x来自当前实现时，才会知道该承诺是真正的承诺。本条款允许使用特定于实现的方法来采用已知符合承诺的状态。

5. 此过程首先存储对 的引用x.then，然后测试该引用，然后调用该引用，可避免多次访问该x.then属性。此类预防措施对于确保访问器属性的一致性非常重要，因为访问器属性的值可能会在多次检索之间发生变化。

6. 实现不应该对可执行链的深度设置任意限制，并且假设超过该任意限制，递归将是无限的。只有真正的循环才会导致TypeError；如果遇到无限的不同可执行链，则永远递归是正确的行为。

