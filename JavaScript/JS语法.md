# JS 语法

### 表达式与语句

* ##### 表达式

  * 1 + 2 表达式的值为 3
  * add(1,2) 表达式的值为 函数的返回值
  * console.log 表达式的值为 函数本身
  * console.log(3) 表达式的值为 undefined

* ##### 语句

  * var a = 1 是一个语句
  * return 后不能接回车

* ##### 区别 

  * 表达式一般有值，语句可能有，可能没有
  * 语句一般会改变环境（声明、赋值）
  * 以上两句话不绝对

### 标识符

* ##### 规则

  * 第一个字符，可以是 Unicode 字母、$ 、 _ 、 中文
  * 后面的字符包括上面及数字
  * 变量名是标识符

### 区块 block

* 把代码包在一起，常与 if / for / while 合用

  ```javascript
  {
      let a = 1;
      let b = 2;
  }
  ```

### if else

```javascript
if (表达式 {
  // ...
} else if (表达式) {
  // ...
} else {
  // ...
}
-------------------
function fn() {
    if (表达式) {
		return 表达式;
    }
    if (表达式) {
        return 表达式;
    }
    return 表达式;
}
```

### switch

```javascript
switch (fruit) {
  case "banana":
    // ...
    break;
  case "apple":
    // ...
    break;
  default:
    // ...
}
```

* **break 不能省略**

### while

```javascript
while (条件) {
  语句;
}
```

### for

```javascript
for (初始化表达式; 条件; 递增表达式) {
  语句
}
```

- 初始化表达式（initialize）：确定循环变量的初始值，只在循环开始时执行一次。
- 条件表达式（test）：每轮循环开始时，都要执行这个条件表达式，只有值为真，才继续进行循环。
- 递增表达式（increment）：每轮循环的最后一个操作，通常用来递增循环变量。

### break

```javascript
for (var i = 0; i < 5; i++) {
  if (i === 3)
    break;
}
// 跳出代码块或循环
```

### continue

```javascript
for (var i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  } else {
    console.log('i 当前为：' + i);
  }
}
// 终止本轮循环，返回循环结构的头部，开始下一轮循环
```

### label

语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置

```javascript
label:
  语句
-----------
foo: {
  console.log(1);
  break foo;
  console.log('本行不会输出');
}
console.log(2);
// 1
// 2
-----------
top:
  for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
      if (i === 1 && j === 1) break top;
      console.log('i=' + i + ', j=' + j);
    }
  }
// 跳出双层循环，break不加标签只能跳出内层循环
```

### 运算符

#### &&

A && B

* A 为真，B 为真，值为 B
* A 为真，B 为假，值为 B
* A 为假，值为 A

A && B && C && D 取第一个假值 或 D，不会取 true / false

#### ||

A || B || C || D 取第一个假值 或 D，不会取 true / false

常用用法：a = a || 10，10为保底值 