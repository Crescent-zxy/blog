# express

线型结构，从开始到结束，依次执行中间件

#### 子应用

```javascript
const app = express(); // 主应用
const admin = express(); // 另一个应用

app.use("/admin", admin); // admin 作子应用
```

#### 挂载点

'/admin' 就是 admin 的挂载点

### 中间件

被插入到启动和结束中间的物件

```javascript
app.use(fn);
// fn 就是中间件
```

#### 优点

##### 模块化

- 每个功能通过一个函数实现
- 通过 app.use 将这个函数整合
- 把函数放到文件或 npm 里，就实现了模块化

#### 路由

```javascript
app.use("/xxx", fn);
app.get("/yyy", fn);
app.post("/zzz", fn);
app.router("/aaa").all(fn).get(fn).post(fn);
```

#### 错误处理

##### next(error)

直接进入 errorHandler，不执行后面的中间件

##### 自定义 errorHandler

```javascript
app.use((err, req, res, next) => {});
// 一般在最后定义，可定义多个
```

### API

#### express.json()

监听请求，解析 json，处理后放入 request.body

```javascript
app.use(express.json());

app.use((request, response, next) => {
  console.log("request body", request.body);

  // 不使用 express.json() 则需要监听 data
  request.on("data", (chunk) => {
    console.log(chunk.toString());
  });
});
```

#### express.static()

静态服务器

```javascript
// 寻找 'xxx' 目录下的文件，没有则 next()
// 请求路径中不带 'xxx'
app.use(express.static("xxx"));
```

#### express.encoded()

解析 url 里的请求参数

#### app.set()

```javascript
// 请求路径大小写敏感
app.set("case sensitive routing", true);
// 渲染视图路径
app.set("views", "xxx");
// 渲染视图引擎，eg: ejs、pug
app.set("view engine", "ejs");
```

#### app.get()

```javascript
// 设置
app.get("env");

// 获取请求
app.get("/xxx", fn);

// 语法糖
app.post();
app.put();
app.delete();
app.patch();
app.all();
```

#### app.render()

使用 view engine 渲染 view

#### app.locals

```javascript
// 本地变量
app.locals.title = 'xxx'
// 等价于
app.set('title', 'xxx)

// 读取
app.locals.title
app.get('title')
```

#### request

```javascript
// 获得请求头里的值
req.get("Content-Type");
// 获得 url 里的参数
req.param("name");
// 获得请求资源的范围（分片下载）
req.range();
```

#### respose

```javascript
// 发送资源（一次性，非流）
res.send();
// 使用视图引擎渲染视图
res.render();
```

#### router

mini 版 app

```javascript
const router = express.Router();

router.get("/", fn);

/* --- 使用 --- */
import xxx from "./routes/xxx";

app.use("/xxx", xxx);
// 请求 xxx 目录则全部走 router 方法
```
