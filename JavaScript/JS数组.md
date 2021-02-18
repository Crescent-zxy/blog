# JS 数组

JS 没有真正的数组，是用对象模拟数组

###### 典型数组

* 元素的数据类型相同
* 使用连续的内存存储
* 通过数字下标获取元素

###### JS 数组

* 元素类型可以不同
* 内存不一定连续
* 通过字符串下标获取元素
* 数组可以有任何 key

### 创建数组

JS 只提供浅拷贝

* ##### 新建

  * let arr = [1,2,3]
  * let arr = new Array(1,2,3)
  * let arr = new Array(3)     // 创建长度为 3 的空数组

* ##### 转化

  * '1,2,3'.split(',')
  * '123'.split('')
  * Array.from('123')    // 字符串
  * Array.from({ 0 : 'a', 1 : 'b', 2 : 'c', length : 3 })   // 有 length 属性，且 key 为下标，长度以 length 属性为准

* ##### 伪数组

  * document.querySelector('div')
  * 伪数组的原型链中没有数组的原型，直接指向对象原型

* ##### 合并数组得到新数组

  * arr1.concat(arr2)

* ##### 截取数组

  * arr.slice(起始位置)，得到包括起始位置到结束的数组，不改变原数组
  * arr.slice(0) 可复制数组

### 删

* delete arr[0]
* 数组长度不变，被删除的项变为 empty
* **稀疏数组**
* 直接修改 length（不要随便改 length）

—————— 以上方法不推荐 ——————

* 删除头部元素：arr.shift()，返回被删元素

* 删除尾部元素：arr.pop()，返回被删元素

* 删除中间元素：（返回被删除元素）

  * arr.splice(起始位置，删除个数)

  * arr.splice(index, 1)，删除 index 位置的元素
  * arr.splice(index, 1, 'x', 'y')，并在删除位置添加 'x', 'y'

### 查

索引越界为 undefined

* Object.keys(arr)
* for( let key in arr ){ console.log( key + ' : ' + arr[key] ) }

——————— 以上是对象的方法，不推荐 ————————

* ```javascript
  // 用 for 循环
  for(let i = 0; i < arr.length; i++){
      console.log(i + ':' + arr[i]);
  }
  -------------------
  for(let key of arr){ 
      console.log(key + ' : ' + arr[key]);
  }
  ```

* ```javascript
  // 用原型上的函数
  arr.forEach(function(item, index){
      console.log(index + ':' + item);
  })
  -------------------
  // forEach 原理
  function forEach(array,fn){
      for(let i = 0; i < arr.length; i++ ){
          fn(array[i],i,array)
      }
  }
  -------------------
  arr.map()  // 有返回值，forEach 没有返回值
  ```

* 二者区别：

  * for 循环可以 break、continue，forEach 只能从头到尾执行完
  * for 循环是关键字，只有块级作用域；forEach 是函数作用域

* 某个元素是否在数组里：arr.indexOf(item)，存在返回索引，不存在返回 -1
* 条件查找元素：arr.find(item => item % 2 === 0)，找第一个偶数
* 条件查找元素索引：arr.findIndex(item => item % 2 === 0)，第一个偶数的索引

### 增

* 尾部加元素：arr.push(newItem)，修改数组，返回新长度
* 头部加元素：arr.unshift(newItem)，返回新长度
* 中间加元素：arr.splice(index, 0, 'x', 'y')，在 index 处插入 'x','y'

### 改

* arr.splice()

* arr.reverse()，反转数组，改变原数组

* ```javascript
  arr.sort()  // 默认升序，改变原数组
  ------- 完整写法 --------
  arr.sort(function(a,b){ 
  	if(a > b){
          return 1;
      }else if(a === b){
          return 0;
      }else{
          return -1;
      }
  }) // 升序
  arr.sort(function(a,b){ 
  	if(a > b){
          return -1;
      }else if(a === b){
          return 0;
      }else{
          return 1;
      }
  }) // 降序
  ------- 简写 --------
  arr.sort((a,b) => a - b) // 升序
  arr.sort((a,b) => b - a) // 降序
  ```

### 数组变换

不改变原数组

* **arr.map**

  ```javascript
  // 数字变星期
  let arr = [0,1,2,2,3,3,3,4,4,4,4,6]
  const days = ['周日','周一','周二','周三','周四','周五','周六']
  let arr2 = arr.map(item => days[item])
  ```

* **arr.filter**

  ```javascript
  let scores = [95,91,59,55,42,82,72,85,67,66,55,91]
  let scores2 = scores.filter(item => item > 60)
  console.log(scores2) //  [95,91,82,72,85,67,66, 91]
  ```

* **arr.reduce**

  ```javascript
  let scores = [95,91,59,55,42,82,72,85,67,66,55,91]
  let sum = scores.reduce((sum, n)=>{
    return n % 2 === 1 ? sum + n : sum;
  },0)
  console.log(sum) // 奇数之和：598 
  ```


### 数组去重

* 不使用 Set

  ```javascript
  // 计数排序
  unique = (array) => {
      const hash = []
      for(let i=0;i<array.length; i++){
          hash[array[i]] = true
      }
      const result = []
      for(let k in hash){
          result.push(k)
      }
      return result
  }
  // 缺点：只支持数字或者字符串数组
  // 如果数组里面有对象，比如 array = [{number:1}, 2]，就会出错
  ```

* 使用 Set

  ```javascript
  unique = (array) => {
      return [...new Set(array)] 
      // 或者 return Array.from(new Set(array))
  }
  // 缺点：API 太新，旧浏览器不支持
  ```

* 使用 Map

  ```javascript
  unique = (array) => {
    let map = new Map();
    let result = []
    for (let i = 0; i < array.length; i++) {
      if(map.has(array[i])) { // 判断 map 中是否已有该 key 
        continue
      } else {  // 如果 map 中没有该 key，就加入 result 中
        map.set(array[i], true);  
        result.push(array[i]);
      }
    } 
    return result;
  }
  // 缺点：API 太新，旧浏览器不支持
  ```

  