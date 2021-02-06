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