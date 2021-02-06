# JS 数据类型

推荐网站：[JavaScript 秘密花园](https://bonsaiden.github.io/JavaScript-Garden/zh/)

### 数字与字符串

* 数字能加减乘除，字符串只能拼接
* 字符串能表示电话号码，数字不行

###### 存储形式

* 数字用 64 位浮点数形式存储
* 字符串用类似 UTF8 形式存储（UCS-2）

###### 字符编码

* 0：48
* A：65
* a：97

### 数据类型

* ### number

  * ###### 特殊值

    * 正 0 和 负 0
    * 无穷：Infinity、+Infinity、-Infinity
    * 无法表示的数字：NaN

  * ###### 范围

    * Number.MAX_VALUE：1.7976931348623157e+308
    * Number.MIN_VALUE：5e-324

  * ###### 精度

    * 最多 52+1 个二进制有效数字，对应十进制：9e+15
    * 小于 90 开头16位的有效数字都能精确表示

* ### string

  使用 2 字节定长 UTF-8  

  * ###### 转义

    * \\' 表示 '
    * \\n 表示换行
    * \\r 表示回车
    * \\t 表示 tab 制表符
    * \\\ 表示 \
    * \\uFFFF 表示对应的 Unicode 字符
    * \\xFF 表示前 256 个 Unicode 字符

  * ###### 属性

    * string.length
    * string[index]

  * ###### base64转码

    * 正常字符串转为 Base64 编码的字符串：window.btoa
    * Base64 编码的字符串转为原来的字符串： window.atob

* ### bool

  * ###### 五个 falsy 值

    相当于 false 但又不是 false

    * undefined
    * null
    * 0
    * NaN
    * ''

* ### undefined

  * 声明变量没有赋值，默认值为 undefined
  * 函数没有 return，默认 return undefined
  * 习惯上非对象空值写为 undefined

* ### null

  * 习惯上对象空值写为 null

* ### object

* ### symbol

* ### bigint

### 变量声明

### let

###### 规则

* 遵循块作用域，即：使用范围不超出 {}
* 不能重复声明
* 可以赋值，也可以不赋值
* 必须先声明再使用
* 全局声明的 let 变量，不会变成 window 的属性
* 配合 for 循环使用有奇效

### const

###### 规则

* 遵循块作用域，即：使用范围不超出 {}
* 不能重复声明
* 声明时就要赋值，赋值后不能改变
* 必须先声明再使用
* 全局声明的 const 变量，不会变成 window 的属性

### 类型转换

* #### number => string

  * String(n)
  * n + ''

* #### string => number

  * Number(s)
  * parseInt(s) （转换为整数，但其实还是浮点数）/ parseFloat(s)（转换为浮点数）
  * s - 0

* #### x => bool

  * Boolean(x)
  * !!x

* #### x => string

  * String(x)

    有bug：String(100000000000000000000) => 1e+22

  * x.toString()

    1.toString() 无法识别

    * (1).toString()
    * 1 .toString()
    * 1..toString()