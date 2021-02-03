# HTTP

HyperText Transfer Protocol（超文本传输协议）

### IP

Internet Protocol（网际互连协议）

ipconfig 命令可查看 ip 信息

* 定位一台设备
* 封装数据报文

路由器连上服务器，获得一个 [ 外网IP ] （不固定）

——— 路由器有两个IP，一个外网IP，一个内网IP ———

路由器在家里创建一个内网，给自己一个 [ 内网IP ]，内网中设备使用 [ 内网IP ]，一般格式：192.168.xxx.xxx

* 内网中设备可以互相访问，不能直接访问外网，需要路由器中转
* 外网设备可以互相访问，不能直接访问内网，需要路由器中转
* 内网、外网相互隔绝，路由器是内网和外网唯一的联通点，也叫 ”网关“

##### 特殊 IP

* 127.0.0.1 表示自己
* localhost 通过 host 指定为自己
* 0.0.0.0 不表示任何设备

### 端口

一台机器可以提供不同服务，一共有 65535 个端口

* HTTP 服务：80 端口
* HTTPS 服务：443 端口
* FTP 服务：21端口

##### 规则

* 0 到 1023（2 的 10 次方减 1）号端口给系统使用，使用需要管理员权限，最好不使用，用户使用其他端口
* http-server 默认使用 8080 端口，部署服务器再使用80端口

### 域名

IP 的别称，ping 命令可查看域名对应 IP

* 一个域名可以对应不同 IP（负载均衡）
* 一个 IP 可以对应不同域名（共享主机）

域名和 IP 通过 **DNS**（Domain Name System，域名解析系统）对应

命令：nslookup 域名

​            ping 域名

##### 过程

* 输入域名，浏览器向 DNS 服务器查询对应 IP
* 得到 IP 后向对应 IP 的 80（HTTP）/443（HTTPS） 端口发送请求（具体端口可在开发者工具里查看）
* 请求内容是查看该网站首页

#### www

* www.xxx.com 和 xxx.com 不是同一个域名
* com 是顶级域名
* xxx.com 是二级域名（俗称一级域名）
* www.xxx.com 是三级域名（俗称二级域名） 二级域名的子域名

### URL

Uniform Resource Locator（统一资源定位器）

完整URL：协议 + 域名或 IP + 端口号 + 路径 + 查询参数 + 锚点

##### 请求

* **路径** 请求不同页面

* **查询参数：?**  同一个页面，不同内容

* **锚点：#**  同一个内容，不同位置

  不支持中文，无法在 Network 面板看见，**不会传给服务器**

### HTTP

用于规定 请求内容 和 响应内容。

标准文档：RFC 2612

##### 基础概念

* ##### 请求

  ```
  请求动词   路径 + 查询参数   协议名/版本   # 请求行
  ———  请求头 ———
  Host：域名或 IP
  Accept：text / html    # 接受的内容
  Content-Type：请求体格式
  ———  请求头 ———
  > 回车
  请求体（上传内容）
  ```
  
  * 三部分：请求行、请求头、请求体
  * 请求动词：GET（获取） / POST（上传） / PUT / PATCH / DELETE
  * 请求体在 GET 请求中一般为空
  * 大小写不敏感
  
* ##### 响应

  ```
  协议名/版本 状态码 状态字符串   # 状态行
  ——— 响应头 ———
  Content-Type：响应体格式
  ——— 响应头 ———
  > 回车
  响应体（下载内容）
  ```

  * 三部分：状态行、响应头、响应体
  * 常见状态码：200（成功）、404（找不到资源）

##### 发请求

* 浏览器地址栏
* curl 命令

发请求的工具叫 [ 用户代理 ]，User Agent

###### curl 命令

用 curl 发 HTTP 请求：

* curl -v http://baidu.com
* curl -s -v -- http://www.baidu.com

> url 会被 curl 工具重写，先请求 DNS 获得 IP
>
> 先进行 TCP 连接，成功后发送 HTTP 请求
>
> 响应结束后关闭 TCP 请求

curl 构造请求

* 请求动词：-X POST（区分大小写）
* 路径和查询参数：直接加在 url 后
* 请求头：-H 'Name：Value'  或者  --header 'Name: Value'
* 请求体：-d '内容'  或者  --data '内容'

###### 请求内容

```
GET / HTTP/1.1                # 协议
Host: baidu.com               # 域名
User-Agent: curl/7.65.3       # 访问工具
Accept: \*/*                  # 期待返回内容（ \*/* 代表都接受）
```

##### 做响应

服务器代码，放在服务器上，每次收到请求会执行一遍代码

* **path**  不带查询参数的路径
* **query**  查询参数的对象形式
* **queryString**  查询参数的字符串形式
* **pathWithQuery ** 带查询参数的路径
* **request**  请求对象
* **response**  响应对象
* **Content-Type**  内容的 类型/语法
* **response.write()**  返回的内容
* **response.end()**  响应结束，发送给用户

###### Node.js 读取请求

* 请求动词：request.method
* 路径：
  * request.url  路径，带查询参数
  * path  纯路径，不带查询参数
  * query  只有查询参数
* 请求头：request.headers[]'Accept']
* 请求体

###### Node.js 设置响应

* 响应状态码：response.statusCode = 200
* 响应头：response.setHearder('Content-Type','text/html')
* 响应体：response.write('内容')，可追加内容

###### 响应内容

```
HTTP/1.1 200 OK                                  
Date: Tue, 02 Feb 2021 13:36:58 GMT              
Server: Apache                                   
Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT     
ETag: "51-47cf7e6ee8400"                         
Accept-Ranges: bytes                             
Content-Length: 81                               
Cache-Control: max-age=86400                     
Expires: Wed, 03 Feb 2021 13:36:58 GMT           
Connection: Keep-Alive                           
Content-Type: text/html                                               
```

### 状态码

描述返回的请求结果

* **1XX**：信息状态码，接收的请求正在处理
* **2XX**：成功状态码，请求正常处理完毕
* **3XX**：重定向状态码，需附加操作以完成
* **4XX**：客户端错误状态码，服务器无法处理
* **5XX**：服务器错误状态码，服务器处理错误

### 2XX

* **200 OK**：请求正常处理
* **204 NO Content**：请求成功处理，返回不含实体主体，客户端不更新
* **206 Partial Content**：客户端范围请求，服务器成功执行

### 3XX

* **301 Moved Permanently**：永久性重定向，请求资源被分配了新URL
* **302 Found**：临时重定向
* **303 See Other**：对应资源存在另一个URL
* **304 Not Modified**：带条件的请求，允许访问资源但不满足条件，不包含相应主体
* **307 Temporary Redirect**：临时重定向，与302相同，不会从POST变成GET

### 4XX

* **400 Bad Request**：请求报文语法错误
* **401 Unauthorized**”：请求需要有通过HTTP认证的认证信息，第二次则用户认证失败
* **403 Forbidden**：请求资源的访问被拒绝
* **404 Not Found**：无法找到请求资源

### 5XX

* **500 Internal Server Error**：服务器执行请求错误
* **503 Service Unavailable**：服务器超负载或停机维护，可提前写入 RetryAfter 首部字段