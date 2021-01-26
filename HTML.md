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
<tag >  #最新语法不用 <tag />
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

