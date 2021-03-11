# HTML

Hyper Text Markup Language（超级文本标记语言）

###### 发明者

Tim Berners-Lee

### WWW

URL + HTML + HTTP

### 标签

```html
<tag attr=value>  属性值没有空格时可不加引号
<tag checked='false'>  为选中，checked不再接受内容
<tag>  #最新语法不用 <tag />
```

### 起手式

```html
<!DOCTYPE html>  #文档类型：HTML
<html lang="zh-CN">  #根节点，语言中文
<head>
    <meta charset="UTF-8">  #文件字符编码
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  #禁用缩放，兼容手机
    <meta http-equiv="X-UA-Compatible" content="ie=edge">  #IE使用最新内核
    <title>Document</title>  #标题
</head>
<body>
    
</body>
</html>
```

###### 完整版 meta:vp ：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover">
/*
width // 设置 viewport 的宽度，正整数/字符串 device-width
height // 设置 viewport 的高度，正整数/字符串 device-height
initial-scale // 设置设备宽度与 viewport大小之间的缩放比例，0.0-10.0之间的正数
maximum-scale // 设置最大缩放系数，0.0-10.0之间的正数
minimum-scale // 设置最小缩放系数，0.0-10.0之间的正数
user-scalable // 如果设置为 no 用户将不能缩放网页，默认为 yes，yes / no
*/
```

配合

```css
img {
    max-width: 100%;
}
```

完成响应式布局

###### iOS 10之后不接受meta标签，可通过js监听手势控制，禁止移动端网页缩放

```javascript
document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
})
```

### 错误检查

>  yarn global add node-w3c-validator

> node-w3c-validator 文件名.html

### 章节标签

* 标题  h1~h6
* 章节  section
* 文章  article
* 段落  p
* 头部  header
* 脚部  footer
* 主要内容  main
* 旁支内容  aside
* 划分  div

### 内容标签

* ol + li  有序列表
* ul + li  无序列表
* dl + dt + dd  描述列表，dt为描述对象，dd为描述内容
* pre  保留空格、回车、tab，否则会压缩为一个
* hr  水平分割线
* br  换行
* a  超链接
* em  语气强调
* strong 本身强调
* code  字体等宽，与pre连用
* quote  引用
* blockqoute  块级引用

### 全局属性

* class
* contenteditable   内容可编辑
* hidden  隐藏   =   display: none
* id   尽量不使用，无法保证唯一性，关键字冲突
* style   样式优先级高于CSS
* tabindex   tab键顺序，0为最后，-1为无法访问
* title

### 其他

版权符号：&copy;

##### 用网址打开页面（不要用本地文件打开）

> yarn global add http-server 
>
> http-server . -c-1  （没有缓存）
>
> 缩写：hs -c-1
>
> 打开地址，后面接：/文件名.html

或

> yarn global add parcel
>
> parcel 文件名.html

##### Emmet 使用

1. ctrl + shift + p

2. emmet wrap

   (输入缩写包围个别行)

###### 多行div

> div*

###### 多行列表

> ul>li*