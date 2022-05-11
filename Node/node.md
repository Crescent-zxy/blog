# Node.js
一个平台，结合多种技术
让 JS 调用系统接口，开发后端应用

##### 使用技术
* V8 引擎
* libuv
* C/C++：c-ares、http-parser、OpenSSL、zlib 等

##### 技术架构

![node技术架构](..\Images\node 技术架构.png)

[deep-into-node]: https://github.com/yjhjstz/deep-into-node

### bindings

* C++ 对 http_parser 封装，对接 JS，封装的文件：http_parser_bingding.cpp
* 对该文件进行编译，JS 代码可直接 require 该文件，从而调用 C++ 库
* binding 就是中间桥梁，bindings 就是集合

### libuv

* FreeBSD：kqueue
* Linux：epoll
* Windows：IOCP
* 跨平台的异步 I/O 库，根据系统自动选择合适方案，用于 TCP/UDP/DNS/文件 等异步操作

### V8

* 将 JS 源码变成机器代码并执行
* 维护调用栈，确保 JS 函数执行顺序
* 内存管理，为所有对象分配内存
* 垃圾回收，重复利用无用内存
* 实现 JS 标准库
* 不提供 DOM API
* V8 本身是多线程，执行 JS 是单线程，可多个线程分别执行 JS
* 自带 event loop，但Node.js 基于 libuv 自己实现了一个

### Event Loop

事件循环

![顺序示意图](..\Images\event loop.png)

* 事件分优先级（文件 > 网络 > 计时器），Node.js 按顺序轮询事件
* 操作系统触发事件，JS 处理事件，Event Loop 管理事件处理顺序
* timers 检查计时器
* poll 轮询，检查系统事件
* check 检查 setImmediate 回调
* 大部分时间停在 poll 轮询阶段，大部分事件在这个阶段被处理，如：文件、网络请求
