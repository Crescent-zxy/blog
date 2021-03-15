# Promise

#### 用途

- 异步计算
- 将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 在对象之间传递和操作promise，帮助我们处理队列
- 解决了回调函数两个结果处理不规范问题
- 避免了回调地狱
- 能进行错误处理

#### 创建

```javascript
const promise = new Promise((resolve, reject) => {});
```

### Promise.prototype.then

then() 方法返回一个 Promise。它最多需要有两个参数：Promise 的成功和失败情况的回调函数。

```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve('Success!');
});

promise1.then((value) => {
  console.log(value);
  // expected output: "Success!"
});
```

### Promise.all

- Promise.all() 方法接收一个promise的可迭代对象，并且只返回一个Promise实例
- 所有输入的promise的resolve回调都结束时执行这个Promise的resolve回调
- 任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject第一个抛出的错误信息。

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

### Promise.race

返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

#### 实现

* 简易版，未实现失败承包制（出现第一个失败后一直执行成功）

```javascript
class Promise {
     // 储存成功回调函数
    resolveQueue = []
	// 储存失败回调函数
    rejectQueue = []

    constructor(fn) {
        const resolve = data => {
            setTimeout(() => {  // 成功回调函数都放入之后再执行
                this.resolveQueue.forEach(i=>{i(data)})
            })
        }
        const reject = reason => {
            setTimeout(() => {  // 失败回调函数都放入之后再执行
                this.rejectQueue.forEach(i=>{i(reason)})
            })
        }
        fn(resolve, reject)
    }

    then(success, error) {
        this.resolveQueue.push(success)
        this.rejectQueue.push(error)
        return this  // 实现链式调用
    }
}
```

* 引入状态判断

```javascript
class Promise {
    // 状态
    status = undefined
    // 成功时数据
    successData = undefined
    // 失败时数据
    errorData = undefined

    resolveQueue = []
    rejectQueue = []

    constructor(fn) {
        this.status = "pending"
        fn(this.resolve.bind(this), this.reject.bind(this))
    }

    resolve = data => {
        // 如果状态不是等待了，不需要往下执行；
        if(this.status !== "pending") return 
        // 更改状态；
        this.status = "fulfilled"; 
        // 存储成功值
        this.successData = params; 
        setTimeout(() => {
            while(this.resolveQueue.length){
            	this.resolveQueue.shift()(data)             
            }
        })
    }
    
    reject = reason => {
        if(this.status !== "pending") return 
        this.status = "rejected"; 
        this.successData = params; 
        setTimeout(() => {
            while(this.rejectQueue.length){
            	this.rejectQueue.shift()(data)             
            }
        })
    }
    
    then(success, error) {
        this.resolveQueue.push(success)
        this.rejectQueue.push(error)
        return this
    }
}
```

