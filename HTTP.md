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

##### 特殊IP

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

  不支持中文，无法在 Network 面板看见，不会传给服务器

### HTTP

用于规定 请求内容 和 响应内容

##### curl 命令

用 curl 发 HTTP 请求：

* curl -v http://baidu.com
* curl -s -v -- http://www.baidu.com

> url 会被 curl 工具重写，先请求 DNS 获得 IP
>
> 先进行 TCP 连接，成功后发送 HTTP 请求
>
> 响应结束后关闭 TCP 请求

##### 请求内容

> GET / HTTP/1.1                         # 协议
> Host: baidu.com                       # 域名
> User-Agent: curl/7.65.3           # 访问工具
> Accept: \*/*                                 # 期待返回内容（ \*/* 代表都接受）

##### 响应内容

> HTTP/1.1 200 OK                                  
> Date: Tue, 02 Feb 2021 13:36:58 GMT              
> Server: Apache                                   
> Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT     
> ETag: "51-47cf7e6ee8400"                         
> Accept-Ranges: bytes                             
> Content-Length: 81                               
> Cache-Control: max-age=86400                     
> Expires: Wed, 03 Feb 2021 13:36:58 GMT           
> Connection: Keep-Alive                           
> Content-Type: text/html                                                       

