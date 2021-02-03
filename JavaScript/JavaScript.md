# JavaScript

###### 发明者

Brendan Eich

###### 背景

* 1994年，网景公司（Netscape）发布了Navigator浏览器0.9版。这是历史上第一个比较成熟的网络浏览器，但是只能用来浏览，不具备与访问者互动的能力。

  网景公司急需一种网页脚本语言，使得浏览器可以与网页互动。

* 1995年Sun公司将Oak语言改名为Java，正式向市场推出。

  网景公司的整个管理层，都是Java语言的信徒，Sun公司完全介入网页脚本语言的决策。Javascript后来由网景和Sun两家公司携手推向市场。

###### 设计思路

Brendan Eich 用10天设计了 Javascript。

1. 借鉴C语言的基本语法；

2. 借鉴Java语言的数据类型和内存管理；
3. 借鉴Scheme语言，将函数提升到"第一等公民"（first class）的地位；
4. 借鉴[Self语言](http://en.wikipedia.org/wiki/Self_(programming_language))，使用基于原型（prototype）的继承机制。

Javascript 语言是两种语言风格的混合产物：（简化的）函数式编程  +（简化的）面向对象编程

### 设计缺陷

**1. 不适合开发大型程序**

* 没有名称空间（namespace），很难模块化

* 没有如何将代码分布在多个文件的规范

* 允许同名函数的重复定义，后面的定义可以覆盖前面的定义，很不利于模块化加载

**2. 非常小的标准库**

* 提供的标准函数库非常小，只能完成一些基本操作，很多功能都不具备。

**3. null 和 undefined**

* null 属于对象（object）的一种，意思是该对象为空

* undefined 则是一种数据类型，表示未定义。

```javascript
typeof null; // object
typeof undefined; // undefined
```

两者非常容易混淆，但是含义完全不同。

```javascript
var foo;
alert(foo == null); // true
alert(foo == undefined); // true
alert(foo === null); // false
alert(foo === undefined); // true
```

**4. 全局变量难以控制**

* 全局变量在所有模块中可见

* 任何一个函数内部都可以生成全局变量，加剧了程序的复杂性

```javascript
a = 1;
(function(){
	b=2;
})(); // 1
alert(b); //2
```

**5. 自动插入行尾分号**

* 所有语句都必须以分号结尾。

* 但如果忘记加分号，解释器并不报错，而是自动加上分号。导致一些难以发现的错误。

```javascript
function(){
　return
	{
		i=1
	};
}
// 解释器自动在return语句后面加上了分号
function(){
  return;
    {
		i=1
	};
}
// 返回值：undefined
```

**6. 加号运算符**

\+ 号作为运算符，有两个含义

* 数字与数字的和
* 字符与字符的连接。

```javascript
alert(1 + 10); // 11
alert("1"+"10"); // 110
```

一个操作项是字符，另一个操作项是数字，则数字自动转化为字符。

```javascript
alert(1 +"10"); // 110
alert("10" + 1); // 101
```

这样的设计，不必要地加剧了运算的复杂性，完全可以另行设置一个字符连接的运算符。

**7. NaN**

NaN 是一种数字，表示超出了解释器的极限。

一些很奇怪的特性：

```javascript
NaN === NaN; // false
NaN !== NaN; // true
alert( 1 + NaN ); // NaN
```

与其设计NaN，不如解释器直接报错，反而有利于简化程序。

**8. 数组和对象的区分**

数组也属于对象（object），数组与对象难以区分

```javascript
// 区分数组和对象
if ( arr &&
	typeof arr === 'object' &&
	typeof arr.length === 'number' &&
	!arr.propertyIsEnumerable('length')){
	alert("arr is an array");
}
```

**9. == 和 ===**

* == 用来判断两个值是否相等

* 当两个值类型不同时，会发生自动转换，得到的结果非常不符合直觉

```javascript
0 == "" // true
0 == "0" // true
false == "false" // false
false == "0" // true
false == undefined // false
false == null // false
null == undefined // true
" \t\r\n" == 0 // true
```

因此，推荐任何时候都使用  "==="（精确判断）比较符。

**10. 基本类型的包装对象**

* 三种基本数据类型：字符串、数字和布尔值

* 都有相应的建构函数，可以生成字符串对象、数字对象和布尔值对象

```javascript
new Boolean(false);
new Number(1234);
new String("Hello World");　
```

与基本数据类型对应的对象类型，作用很小，造成的混淆却很大。

```javascript
alert( typeof 1234); // number
alert( typeof new Number(1234)); // object　
```