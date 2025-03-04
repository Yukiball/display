```ts
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const FUNC = "function";

export class MyPromise {
  private state: string = PENDING;
  private result: any = undefined;
  #handler: Array<any> = [];
  #resolve: (data: any) => any;
  #reject: (reason: any) => any;
  constructor(func: (res: any, rej: any) => void) {
    this.#resolve = (data: any) => {
      this.changeState(FULFILLED, data);
    };
    this.#reject = (reason: any) => {
      this.changeState(REJECTED, reason);
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
    return !!(
      fn !== null &&
      (typeof fn === "function" || typeof fn === "object") &&
      typeof fn.then === "function"
    );
  }
  private doSomeThing() {
    if (this.state === PENDING) return;
    while (this.#handler.length) {
      const { onResolved, onRejected, resolve, reject } = this.#handler.shift();
      if (this.state === PENDING) return;
      if (this.state === FULFILLED) {
        this.isFunc(onResolved, resolve, reject);
      } else {
        this.isFunc(onRejected, resolve, reject);
      }
    }
  }
  then(onResolved: any, onRejected?: any) {
    return new MyPromise((resolve: any, reject: any) => {
      this.#handler.push({ onResolved, onRejected, resolve, reject });
      // 同步情况直接这里
      this.doSomeThing();
    });
  }
  catch(onRejected: any) {
    return this.then(null, onRejected);
  }
  finally(callback: any) {
    return this.then(
      (data: any) => {
        callback();
        return data;
      },
      (reason: any) => {
        callback();
        throw reason;
      }
    );
  }
  // 返回一个已完成的promise
  // 1、传递的data本来就是promise对象
  // 2、传递的data是promiseLike,返回新的Promise，状态和其保持一致
  // 3、传递的data是其他
  static resolve(data: any) {
    if (data instanceof MyPromise) {
      return data;
    }
    return new MyPromise((resolve, reject) => {
      if (
        data !== null &&
        (typeof data === "function" || typeof data === "object") &&
        typeof data.then === "function"
      ) {
        data.then(resolve, reject);
      } else {
        resolve(data);
      }
    });
  }
  // 得到一个被拒绝的Promise
  static reject(reason: any) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(proms: Iterable<any>) {
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
  static allSettled(proms: Iterable<any>) {
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
  static race(proms: Iterable<any>) {
    return new MyPromise((resolve, reject) => {
      for (const p of proms) {
        this.resolve(p).then(resolve, reject);
      }
    });
  }
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
}
```
