# 内存图 与 JS 世界

### 进程与线程

* 对于操作系统，一个任务就是一个进程（Process）。
* 一个进程内部，同时运行多个“子任务”，这些“子任务”称为线程（Thread）。
* 浏览器打开一个页面开启一个进程，该进程开启一个 “渲染引擎” 线程，一个 “JS 引擎” 线程。不同线程可进行跨线程通信。
  * 渲染引擎：渲染 HTML 和 CSS
  * JS 引擎：执行 JS，JS 为单线程

### JS 引擎

##### JS 引擎举例

* Chrome：V8，C++
* Firefox：SpiderMonkey，C++
* Safari：JavaScriptCore
* IE：Chakra（JScript9）
* Edge：Chakra（JavaScript）
* Node.js：V8

##### 主要功能

* 编译：把 JS 代码翻译为机器能执行的字节码或机器码
* 优化：改写代码，使其更高效
* 执行：执行上面的字节码或者机器码
* 垃圾回收：回收 JS 用完的内存

### JS 执行

运行环境：window / document / setTimeout 等，由浏览器提供，JS本身不具备

##### 内存分区

JS 代码在内存中运行，JS 引擎内存分为：（简单归纳，不完整）

* 代码区：存放 JS 代码
* 变量区：存环境和变量
* 数据区：存储数据
  * Stack 区（栈）：连续存储，每个数据顺序存放。存放非对象
  * Heap 区（堆）：链接存储，每个数据随机存放。存放对象

### JS 原型

xxx.prototype 存储了 xxx 对象的共同属性，这就是原型

无需重复声明共有属性

每个对象都有一个隐藏属性（ \__proto__ ），指向原型（对象）

###### prototype 和 \__proto__ 区别

* 都存着原型地址
* prototype 挂在函数上
* \__proto__ 挂在每个新生成的对象上

#### window

* window 变量 和 window 对象是两个东西
* window 变量是一个容器，存放 window 对象地址
* window 对象是 Heap 里的数据
* console 和 Object 同理

##### 原型链

![内存图](..\Images\内存图.png)