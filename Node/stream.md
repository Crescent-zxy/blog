# Stream

流

### 写

```javascript
const fs = require('fs')

const stream = fs.createWriteStream('./big_file.txt')

for(let i = 0; i < 100000; i++){
    stream.write(`这是第${i}行内容\n`)
    stream.end()
    console.log('done')
}
```

* stream：水流
* stream.write：水流中的水（数据）
* chunk：每次写的小段数据（块）
* source：产生数据端（源头）
* sink：得到数据端（水池）

### 读

```javascript
const http = require('http')
const fs = require('fs')

const server = http.createServer()

server.on('request',(request,response)=> {
    const stream = fs.createReadStream('./big_file.txt')
    stream.pipe(response)
})

server.listen(8888)
```

* 减少内存占用

### 管道

两个流可以通过管道相连

```javascript
stream1.pipe(stream2)

/* 链式操作 */
a.pipe(b).pipe(c)
// 等价于
a.pipe(b)
b.pipe(c)

/* 通过事件实现 */
stream1.on('data',(chunk) => {
    stream2.write(chunk)
})
stream1.on('end',() => {
    stream2.end()
})
```

### Stream 对象原型链

**Stream 对象都继承了 EventEmitter**

`s = fs.createReadStream(path)`

对象层级：

1. 自身属性（由 fs.ReadStream 构造）
2. 原型：stream.Readable.prototype
3. 二级原型：stream.Stream.prototype
4. 三级原型：events.EventEmitter.prototype
5. 四级原型：Object.prototype

### Stream 分类

| 名称      | 特点             |
| --------- | ---------------- |
| Readable  | 可读             |
| Writale   | 可写             |
| Duplex    | 可读可写（双向） |
| Transform | 可读可写（变化） |

### Readable Stream

**静止态 paused 和 流动态 flowing**

* 默认处于 paused 态
* 添加 data 事件监听，就变成 flowing 态
* 去掉 data 事件监听，就变成 paused 态
* pause() 可变为 paused
* resume() 可变为 flowing

### Writable Stream

#### drain 事件

* 流干了，可以加点水了
* 调用 stream.write(chunk) 得到 false，表示数据积压
* 此时停止 write，监听 drain，drain 事件触发再继续 write

#### finish 事件

* 调用 stream.end() 之后，且缓冲区数据已传给底层系统，触发 finish 事件

### 自定义 Stream

#### Writable Stream

```javascript
cosnt { Writable } = require("stream")

const outStream = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString())
        callback()
    }
})

process.stdin.pipe(outStream)
```

#### Readable Stream

```javascript
const { Readable } = require("stream")

/* 直接写入 */
const inStream = new Readable()

inStream.push("abcde")
inStream.push("12345")

inStream.push(null) // no more data
/* --- */

/* 调用时写入 */
const inStream = new Readable({
    read(size){
        // 调用时推送，依次推出 A 到 Z
        this.push(String.fromCharCode(this.currentCharCode++))
        if( this.currentCharCode > 90 ){ // Z
            this.push(null)
        }
    }
})

inStream.currentCharCode = 65 // A
/* --- */

inStream.pipe(process.stdout)
```

#### Duplex Stream

```javascript
const { Duolex } = require("stream")

const inoutStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString())
        callback()
    },
     read(size){
        // 调用时推送，依次推出 A 到 Z
        this.push(String.fromCharCode(this.currentCharCode++))
        if( this.currentCharCode > 90 ){ // Z
            this.push(null)
        }
    }
})

inoutStream.currentCharCode = 65

process.stdin.pipe(inoutStream).pipe(process.stdout)
```

#### Transform Stream

```javascript
const { Transform } = require("stream")

const upperCaseTr = new Transform({
    transform(chunk, encoding, callback){
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

process.stdin.pipe(upperCaseTr).pipe(process.stdout)
```

##### 内置的 Transform Stream

```javascript
const fs = require("fs")
const zlib = require("zlib")
const crypto = require("crypto")
const file = process.argv[2]

const { Transform } = require("stream")

const reportProgress = new Transform({
    transform(chunk, encoding, callback){
       process.stdout.write(".")
       callback(null, chunk)
    }
})

fs.createReadStream(file)
  .pipe(crypto.createCipher("aes192","123456")) // 加密
  .pipe(zlib.createGzip())
  .pipe(reportProgress) // 进度条
  .pipe(fs.createWriteStream(file + '.gz'))
  .on("finish", () => console.log("Done"))
```

