# AJAX

Async JavaScript And XML

**用 JS 发请求和收响应**

###### 背景

AJAX 是浏览器上的功能

* 浏览器可以发请求，收响应
* 浏览器在 window  上加了 XMLHttpRequest 函数
* 用这个构造函数（类）可以构造出一个对象
* JS 通过它实现发请求，收响应

#### 步骤

* 创建 XMLHttpRequest 对象

  ```javascript
  const request = new XMLHttpRequest()
  ```

* 调用对象的 open 方法

  ```javascript
  request.open('GET', url)
  ```

* 监听对象的 onload & onerror 事件，在事件处理函数里操作文件内容

  ```javascript
  request.onload = () => {
      // 成功
      // 加载 CSS，创建 style 标签
      const style = document.createElement('style')
      // 返回内容写入 style
      stylet.innerHTML = request.response
      // 标签插到 head 里
      document.head.appendChild(style)
  }
  request.onerror = () => {
      // 失败
  }
  ```

  ##### onreadystatechange 事件更专业

  ```javascript
  request.onreadyStatechange = () => {
      if(request.readyState === 4) { // 下载完成，不知道是否成功
          if(request.status >= 200 && request.status < 300) {
              // 成功
          } else {
              // 失败
          }
      }
  }
  ```

  * readyState === 1：new XMLHttpRequest()
  * readyState === 2：request.send()
  * readyState === 3：开始加载资源
  * readyState === 4：资源加载完成

* 调用对象的 send 方法（发送请求）

  ```javascript
  request.send()
  ```

### JSON

JavaScript Object Notation

##### 支持的数据类型

* string：只支持双引号
* number：支持科学计数法
* bool：true 和 false
* null：没有 undefined
* object
* array

不支持函数，不支持变量，不支持引用

#### JSON.parse

* 将符合 JSON 语法的字符串转换成 JS 对应类型的数据
* JSON 字符串 => JS 数据类型
* 不符合 JSON 语法则抛出 Error 对象
* 用 try catch 捕获错误

#### JSON.stringify

* JSON.parse 的逆运算
* JS 数据 => JSON 字符串
* JS 数据类型比 JSON 多，不一定成功
* 失败抛出 Error 对象