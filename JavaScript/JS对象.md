# JS 对象

### 定义

* 无序的数据集合
* 键值对的集合

###### 键值对

属性名（键名）：属性值（键值）

### 写法

```javascript
let obj = {
    ’name‘: 'zxy',
    ’age‘: 18
}
---------------
let obj = new Object({’name‘: 'zxy'})
---------------
console.log({’name‘: 'zxy'})
---------------
// 用变量当属性名
let a = 'xxx'
// let a = Symbol()，除了字符串，symbol也能做属性名
let obj = {
    [a]: 111
}
// obj => { xxx: 111  }
```

### 细节

* 键名是字符串，不是标识符，可以包含任意字符
* 键名引号可省略，省略之后部分字符不能用
* **省略引号依然是字符串**，数字变成字符串会进行换算
* Object.keys(obj) 可以得到 obj 的所有 key

### 原型

* JS 中每个对象里有一个隐藏属性：\__proto__（名称没有规范）
* 隐藏属性储存着其 **共有属性组成的对象** 的地址
* **公有属性组成的对象** 叫 原型
* 即：隐藏属性储存着原型的地址

##### 每个对象都有原型

* 原型里存着对象的共有属性
* obj.\__proto__ 存着原型的地址

##### 对象的原型也是对象

* 对象的原型也有原型
* obj = {} 的原型即为所有对象的原型
* 这个原型包含所有对象的共有属性，是对象的根
* 这个原型的原型为 null

### 增删改查

#### 删

* delete obj.xxx
* delete obj['xxx']

#### 查

* 查看所有属性：Object.keys(obj)
* 查看所有值：Object.values(obj)
* 查看所有属性和值：Object.entries(obj)
* 查看自身 + 共有属性：
  * console.dir(obj)
  * Object.keys(obj.\__proto__)
* 查看某一个属性：
  * obj.key
  * obj['key']

###### 是否含有属性

'xxx' in obj

（obj.xxx === undefined 为 true 不能证明不含有该属性，该属性值可能为 undefined）

###### 属性是否共有

obj.hasOwnProperty('key')

#### 写

##### 直接赋值

* obj.key = value
* obj['key'] = value
* let a = 'key', obj[a] = value

##### 批量赋值

* Object.assign( obj, { key1 : value1, key2 : value2, ... } )

**无法通过自身修改或增加共有属性**

* 修改原型：window.Object.prototype.key = 'xxx'，一般不要修改原型

* 增加、创建原型：let a =  Object.create(obj)，以 obj 为原型创建 a，obj 依然会指向最初的原型，形成原型链

### 类

针对对象的分类

常见：Array、Function、Date、RegExp 等

#### JS 创建一个类

```javascript
// 不使用 new 关键字
function createPerson(name, age){ // 构造函数
	let obj = Object.create(createPerson.prototype);
    obj.name = name;
    obj.age = age;
    return obj;
}
// 原型
createPerson.prototype = {  // 把原型放到函数上
    sayHi(){
        console.log('你好，我叫' + this.name);
    },
    constructor: createSquare  // 方便通过原型找到构造函数
} 
let a = createPerson('zxy',18) // 调用构造函数创建a对象
------- new -------
// 使用 new 关键字，原型创建构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function () {
    console.log('你好，我叫' + this.name)
}
let b = new Person('xxx',18) // 创建对象b
```

#### new X()

* 创建空对象
* 为空对象关联原型，原型地址指定为 X.prototype（将 X.prototype 保存的地址复制到空对象.\__proto__ 里）
* 将空对象作为 this 关键字运行构造函数
* return this

##### 构造函数 X

可以构造出对象的函数

* 函数本身负责给对象本身添加属性
* X.prototype 对象负责保存对象的共用属性

###### 函数与原型结合

**对象.\__proto__ === 其构造函数.prototype**

* 所有函数都有 prototype 属性
* 所有 prototype 都有 constructor 属性
* 所有 constructor 属性保存了对应的函数地址

#### class 关键字创建构造函数

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 一般不在这个语法里使用箭头函数
    sayHi() { 
        console.log("你好，我叫" + this.name)
    }
}
// 等价于上面的原型写法
```

##### class 第二种写法

```javascript
class Person{
 	 sayHi = () => {} // 一般不在这个语法里使用普通函数，多用箭头函数
}
// 等价于
function Person(){
	this.sayHi = () => {}
}
```

###### 结果

```javascript
let person = new Person('frank', 18)
person.name === 'frank' // true
person.age === 18 // true
person.sayHi() // 你好，我叫 frank

let person2 = new Person('jack', 19)
person2.name === 'jack' // true
person2.age === 19 // true
person2.sayHi() // 你好，我叫 jack
```

### Object.prototype

**Object.prototype 是所有对象的（直接或间接）原型**

* Object.prototye 是「Object 构造出来的对象 obj」的原型，即 obj.\__proto__ === Object.prototype

* Object.\__proto__ 是 Object 的原型，
* Object 是函数，而所有函数的原型都是 Function.prototype，所以 Object.\__proto__ === Function.prototype

* Object.prototye 不是 Object 的原型，Object.\__proto__ 才是 Object 的原型

### window

* window 是 Window 构造的
* window.Object 是 window.Function 构造的
* 所有函数都是 window.Function 构造的
* window.Founction 是 window.Function 构造的
* 浏览器构造了 Function，然后指定它的构造者是自己

### 代码规范

* 构造函数首字母大写
* 构造出来的对象首字母小写
* new 后面的函数使用名词形式
* 其他函数一般用动词开头