# jQuery

* 链式风格
* jQuery(选择器)获取对应元素，返回一个对象
* jQuery构造出来的对象，可以操作对应的元素
* jQuery是一个不需要加 new 的构造函数，不是常规构造函数

### 获取元素

一个选择表达式，放进构造函数jQuery()（简写：$()），得到被选中的元素

```javascript
// CSS 选择器
$('#myId') // ID为 myId 的元素
$('input[name=first]') // name属性等于first的input元素

// JQurey 表达式
$('a:first') //选择网页中第一个a元素
$('tr:odd') //选择表格的奇数行
```

### 链式操作

* 选中网页元素后，可以进行一系列操作

* 所有操作可以连接在一起，以链条的形式写出来

```javascript
$('div').find('h3').eq(2).html('Hello');
---- 分解 ----
$('div') //找到div元素
 .find('h3') //选择其中的h3元素
 .eq(2) //选择第3个h3元素
 .html('Hello'); //将它的内容改为Hello
-------
.end()方法，使得结果集可以后退一步
```

###### 原理

每一步的jQuery操作，返回的都是一个jQuery对象

### 创建元素

新元素直接传入jQuery的构造函数

```javascript
$('<p>Hello</p>');
$('<li class="new">new list item</li>');
```

### 移动元素

例：把 div 移动到 p 后面

* 直接移动该元素：

  `$('div').insertAfter($('p'))`  

  div 移到 p 后面，返回 div 元素

* 移动其他元素，使目标元素达到想要的位置：

  `$('p').after($('div'));`  

  p 加到 div 前面，返回 p 元素

###### 类似操作模式

* `insertAfter()` 和 `after()`：在现存元素的外部，从后面插入元素
* `insertBefore()` 和 `before()`：在现存元素的外部，从前面插入元素
* `appendTo()` 和 `append()`：在现存元素的内部，从后面插入元素
* `prependTo()` 和 `prepend()`：在现存元素的内部，从前面插入元素

### 修改元素属性

* 使用同一个函数，完成取值（getter）和赋值（setter）
* "取值器"与"赋值器"合一
* 函数的参数决定取值还是赋值

###### 常见函数

* `html()` 取或设置 html 内容
* `text()` 取或设置 text 内容
* `attr()` 取或设置某个属性的值
* `width()` 取或设置某个元素的宽度
* `height()` 取或设置某个元素的高度
* `val()` 取出某个表单元素的值

###### 注意

* 如果结果集包含多个元素，赋值的时候，将对其中所有的元素赋值

* 取值的时候，只取出第一个元素的值

* `text()` 例外，取出所有元素的 text 内容