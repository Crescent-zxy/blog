# Child_Process

### Process

进程

* 进程是程序的执行实例
* 程序在 CPU 上执行时的活动叫 进程
* 一个进程可以创建另一个进程（子进程）
* 任务管理器可看进程

### CPU

* 单核 CPU 在一个时刻只能做一件事
* 在不同进程中快速切换以同时执行不同任务
* 多程序并发执行：宏观上并行，微观上串行
* 每个进程会出现「执行 - 暂停 - 执行」的规律
* 多个进程间会出现抢资源现象

### 阻塞

等待执行的进程中

* 都是非运行态
* 非阻塞进程：等待 CPU 资源
* 阻塞进程：等待 I/O 完成
* 分派程序只把 CPU 分给非阻塞进程

### Thread

线程

##### 背景

* 面向进程设计的系统：进程是程序的基本执行实体，也是资源分配的基本实体
* 面向线程设计的系统：进程不是基本运行单位，而是线程的容器
* 进程的创建、切换、销毁比较耗时，引入线程作为执行的基本实体
* 而进程只作为资源分配的基本实体

##### 概念

* CPU 调度和执行的最小单元
* 一个进程中有大于等于一个线程，所有线程共享该进程中的所有资源
* 进程的第一个线程叫初始化线程
* 线程的调度可以由操作系统和用户负责

##### 例子

* 浏览器进程： 渲染引擎、V8 引擎、存储模块、网络模块、用户界面模块 等
* 每个模块都可以放在一个线程里

### API

#### exec

* execute 缩写，执行 bash 命令
* 同步版本：execSync

```javascript
const child_process = require('child_process')
const { exec } = child_process

const result = exec('ls -l ../', (error, stdout, stderr) => {
    console.log(error)
    console.log(stdout)
    console.log(stderr)
})
```

#### stream

* 返回两个流

```javascript
const child_process = require('child_process')
const { exec } = child_process

const streams = exec('ls -l ../') // 读取上级目录文件列表

streams.stdout.on('data', (chunk) => {
    console.log(chunk)
})

streams.stderr.on('data')
```

#### Promise

* 用 util.promisify 使其 Promise 化

```javascript
const util = require('util')
const child_process = require('child_process')
const { exec } = child_process

const execPro = util.promisify(exec)

execPro("ls ../").then(data => {
    console.log(data.stdout)
})
```

#### execFile

* 防止 cmd 注入，使用 execFile
* 执行特定的程序
* 命令行的参数用数组形式传入，无法注入
* 同步版本：execFileSync

```javascript
const child_process = require('child_process')
const { execFile } = child_process

const userInput = "."

execFile("ls", ["-la", userInput], (error, stdout) => {
    console.log(stdout)
})

// 支持流
const streams = execFile("ls", ["-la", userInput])

streams.stdout.on('data', (chunk) => {
    console.log(chunk)
})

streams.stderr.on('data')
```

##### options

常用选项

* cwd：Current working directory 执行路径
* env：环境变量
* shell：运行 shell
* maxBuffer：最大缓存，默认 1024 * 1024 字节

#### spawn

* 用法与 execFile 类似，两者相比最好使用 spawn
* 没有回调函数，只能通过流事件获取结果
* 没有最大限制

#### fork

* 创建一个子进程，执行 Node 脚本
* `fork('./child.js')` 相当于 `spawn('node', ['./child.js'])`
* 会多一个 message 事件，用于进程通信
* 会多一个 send 方法

```javascript
const child_process = require('child_process')

cosnt major = child_process.fork('./child.js')

major.on('message', (m) => {
    console.log('主进程得到信息：', m)
})

n.send('hello') // 向子进程发送信息

/* child.js */
process.on('message', (m) => {
    console.log('子进程得到信息：'， m)
})

process.send('world') // 向主进程发送信息
```

#### worker_threads

线程 API，不建议使用

##### AIP 列表

* isMainThread
* new Worker(filename)
* parentPort：线程中通信
* postMessage

##### 事件列表

* message
* exit