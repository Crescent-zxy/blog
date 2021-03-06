# JS 函数

JS 里，函数是一种对象

**所有函数都是由 Function 构造的**

任何函数.\__proto__ === Function.prototype

任何函数包括：Object / Array / Function

### 定义函数

fn 是函数自身，fn() 是函数调用

* ##### 具名函数

  ```javascript
  function 函数名(形参1，形参2){
      语句
      return 返回值
  }
  ```

* ##### 匿名函数

  ```javascript
  let a = function(x,y){
      return x+y
  }
  // 也叫函数表达式（等号后面的）
  // a 是匿名函数的引用，不是真正的函数
  ----------------
  let a = function fn(x,y){
      return x+y
  }
  // fn 作用域只在等号右边，无法 fn() 调用
  ```

* ##### 箭头函数

  ```javascript
  let f1 = x => x*x
  let f2 = (x,y) => { return x+y }
  let f3 = (x,y) => ({ name:x, age:y })  // 返回对象
  ```

* ##### 用构造函数

  ```javascript
  let f = new Function('x', 'y', 'return x+y')
  // 所有函数都是 Function 构造出来的
  // 包括 Object、Array、Function 也是
  ```

### 函数要素

* ##### 调用时机

  ```javascript
  let i = 0
  for(i = 0; i < 6; i++){
    setTimeout(() => {
      console.log(i)
    },0)
  }
  // 打出 6个6
  // 原因：i循环6次，设置6个setTimeout，setTimeout在for循环结束后才执行
  // 此时的i为6，6个setTimeout打印出i的结果就为6个6
  --------------
  for(let i = 0; i < 6; i++){
    setTimeout(() => {
      console.log(i)
    },0)
  }
  // 打出 0 1 2 3 4 5
  // JS 在 for 和 let 一起用时，每次循环会多创建一个 i（JS对新手的特别设计）
  // 可以理解为：
  for(let i = 0; i < 6; i++){
    let j = i;
    setTimeout(() => {
      console.log(j)
    },0)
  }
  ------- 其他方法 -------
  // 1、用立即执行函数
  for(var i = 0; i < 6; i++){
    ! function (j) {
       setTimeout(() => {
          console.log(j)
        },0);
     }(i);
  }
  // 2、用setTimeout第三个参数
  for(var i = 0; i < 6; i++){
    setTimeout(function timer(j){
      console.log(j)
    },0,i)
  } 
  // setTimeout 第三个及以后的参数会在定时器到期时作为参数传给 function timer
  ```
  
* ##### 作用域

  * 每个函数都会默认创建一个作用域，函数和作用域可以嵌套

    * 全局变量：顶级作用域声明的变量，window 的属性

    * 局部变量：其他都是局部变量

  * 作用域规则（闭包）

    * 就近原则：多个作用域有同名变量 a，查找 a 声明时向上取最近的作用域
    * 查找 a 的过程与函数执行无关
    * 静态作用域（词法作用域）：与函数执行没有关系的作用域
    * a 的值与函数执行有关

* ##### 闭包

  JS中，函数内部可以直接读取全局变量，函数外部无法直接读取函数内的局部变量。

  一个函数用到了外部的变量，这个函数加这个变量就叫闭包。

  闭包是一个带有执行环境的函数。

  * 闭包一定是函数对象

  *  闭包和词法作用域、作用域链、垃圾回收机制等息息相关

  * 函数内保持对上层作用域的引用

  *  当函数在其定义的作用域外进行访问时，才产生闭包

  * 闭包是由该函数和其上层执行上下文共同构成

  ###### 用途

  * 模仿块级作用域：立即执行函数，得到局部变量，避免全局污染

  * 储存外部函数变量：内部函数保留了对外部变量的引用，该变量不会被释放

  * 隐藏局部变量，暴露操作函数：把函数当作一个范围，函数内部的变量是私有变量，外部无法引用，通过闭包访问私有变量

    ```javascript
    var person = function(){
        //变量作用域为函数内部，外部无法访问
        var name = "default";
        return {
            getName : function(){
                return name;
            },
            setName : function(newName){
                name = newName;
            }
        }
    }();
    print(person.name);//直接访问，结果为undefined
    print(person.getName()); // default
    person.setName("abruzzi");
    print(person.getName()); // abruzzi
    ```

  ###### 缺点

  * 闭包会使得函数中的变量被保存在内存中，增加内存消耗，不能滥用闭包，否则会造成网页的性能问题，低版本IE还可能导致内存泄露。（闭包并不会造成内存泄露，真实原因是 JS 引擎的实现有问题）
  * 闭包会在函数外部，改变函数内部变量的值。如果把函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时不要随便改变函数内部变量的值。

* ##### 形式参数

  非实际参数，形参可认为是变量声明

  ```javascript
  function add(x, y){
      return x=y;
  }
  // 等价于
  function add(){
      var x = arguments[0];
      var y = arguments[1];
      return x+y;
  }
  ----- 参数数量可变 -----
  function add(x){
      return x + arguments[1];  // 可通过 arguments 拿到其余参数
  }
  add(1,2)
  ```

* ##### 返回值

  * 每个函数都有返回值
  * 没有 return 则返回值为 undefined
  * 函数执行完后才会返回
  * 只有函数有返回值

* ##### 调用栈

  * JS 引擎在调用一个函数前，把函数所在的环境 push 到一个数组里，这个数组叫调用栈

  * 函数执行完后，把环境弹（pop）出来

  * return 到之前的环境，继续执行后续代码

  * 递归函数调用栈

    ```javascript
    function add (n) {
        return n === 1 ? 1 : n+add(n-1);
    }
    // 先递进再回归的函数叫递归函数
    // 递归函数调用栈很长
    // 调用栈中压入的帧过多，程序就会崩溃
    ------- 调用栈最长有多少 --------
    function computeMaxCallStackSize() {
        try {
            return 1 + computeMaxCallStackSize();
        } catch (e) {
            // 报错说明 stack overflow
            return 1;
        }
    }
    ```

* ##### 函数提升

  * 提升：function fn(){}，具名函数声明在哪里都会跑到第一行
  * 不提升：let fn = function(){}，这是赋值，右边的匿名函数声明不会提升

* ##### arguments（箭头函数没有）

  ```javascript
  function fn(){
      console.log(arguments);
  }
  // arguments 是传入形参组成的伪数组
  ```

* ##### this（箭头函数没有）

  ```javascript
  function fn(){
      "use strict"        // 不加这句话 xxx 会被自动转化成对象
      console.log(this);
  }
  // this 默认指向 window
  // 可以使用 fn.call(xxx,1,2,3) 传 this 和 arguments，this 指向 xxx
  // this 是隐藏参数，arguments 是普通参数 
  ------------------
  let person = {
      name: 'zxy',
      sayHi(){
          console.log(this,name)
      }
  }
  person.sayHi() // 正规写法：person.sayHi.call(person)
  // 等于 person.sayHi(person)，JS引擎会把 person 作为 this 传入函数
  person.sayHi.call({name:'jack'})
  // => jack，不会传入 person，而是把传入参数作为 this
  ```

  ###### 两种使用方法：

  ```javascript
  // 隐式传递
  fn(1,2)  // 等价于 fn.call(undefined,1,2)
  obj.child.fn(1)  // 等价于 obj.child.fn.call(obj.child,1)
  
  // 显式传递
  fn.call(undefined,1,2)
  fn.apply(undefined,[1,2])
  ```

  ###### 绑定 this

  ```javascript
  // 使用 bind 可以让 this 不被改变
  function f1(p1, p2){
      console.log(this, p1, p2)
  }
  let f2 = f1.bind({ name:'zxy' })
  // f2 就是 f1 绑定了 this 之后的新函数
  f2()  // 等价于 f1.call({ name:'zxy' })
  
  // bind 绑定其他参数
  let f3 = f1.bind({ name:'zxy' }, 'hi')
  f3() // 等价于 f1.call({ name:'zxy' }, 'hi')
  ```

  ###### 箭头函数

  ```javascript
  // 箭头函数没有 this，this是普通参数，指向当前执行环境
  console.log(this) // window
  let fn = () => console.log(this)
  fn() // window
  fn.call({ name:'zxy' }) // window
  ```

### 立即执行函数

```javascript
// 已过时，不建议使用
! function {
    var a = 1;
} ()
// 为了得到局部变量，引入一个匿名函数，然后加 () 执行它
// 但该语法不合法，在匿名函数前加运算符可解决
// !、~、()、+、- 都可以，推荐使用 !
```

### call、apply、bind

```javascript
--- 隐式传参 ---
fn(1,2)   // 等价于下方显示传参
--- 显示传参 ---
fn.call(undefined,1,2)
fn.apply(undefined,[1,2])
// call 和 apply 第一个参数为 this，如果这个函数处于非严格模式下，null 或 undefined 会自动替换为指向全局对象，原始值会被包装
// call 接受参数列表，apply 接受一个参数数组
// bind 创建一个新函数，新函数的 this 指定为 bind 第一个参数，相当于绑定了this
let f2 = fn.bind({name: zxy},1,2)
f2() // 等价于 fn.call({ name:'zxy' },1,2)
--- 对象的函数调用 ---
obj.fn(1,2) // 等价于 obj.fn.call(obj,1,2)
// 会把当前对象作为第一个参数传给 this
```

### 函数式封装

```javascript
let id = 0
const createId = () => {
    id += 1
    return id
}
export { createId }
```

### 面向对象式封装

```typescript
let id = 0
class Id = () => {
    value: number
    constructor(){
        id += 1
        this.value = id
    }
    newStart(){
        return this.value + 10000
    }
}
```

