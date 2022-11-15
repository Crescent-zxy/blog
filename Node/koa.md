# Koa

升级版 express 　
express 作者 TJ 对 express 的优化与重构
基于新版 node

#### 编程模型

- express 中间件是线型

  ```javascript
  // 记录响应写入时间
  app.use((req, res, next) => {
    const start = Date.now();
    res.locals.start = start;
    next();
  });

  app.use((req, res, next) => {
    res.write("hello world");
    res.end();
    next();
  });

  app.use((req, res, next) => {
    const time = Date.now() - res.locals.start;
    console.log("time", time);
    next();
  });
  ```

- koa 中间件是 U 型（洋葱型）

  从开始到结尾，再由结尾回到开始

  ```javascript
  // 记录响应写入时间
  app.use(async (ctx, next) => {
    await next();
    const time = ctx.response.get("X-Response-Time");
    console.log("setTime", time);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next(); // 等待 下一个中间件执行结束
    const time = Date.now() - start;
    ctx.set("X-Response-Time", `${time}ms`);
    /* 等价于
      return next().then(() => {
        const time = Date.now() - start;
        ctx.set("X-Response-Time", `${time}ms`);
      })
    */
  });

  app.use(async (ctx) => {
    ctx.body = "Hello World";
  });
  ```

#### 语言特性

- express 使用回调函数 next()
- koa 使用 ES6 新语法 generator、async / await

### API

#### app

- app.use(fn)：插入中间件 fn
- app.on('error',fn)：错误处理
- app.emit：触发事件

#### ctx

node.js 封装的请求

- ctx.req
- ctx.res

koa 封装的请求

- ctx.request
- ctx.response

- ctx.state：跨中间件分享数据

##### ctx.request

- request.method
- request.path
- request.query

##### ctx.response

- response.status
- response.body
- response.set
- response.append
