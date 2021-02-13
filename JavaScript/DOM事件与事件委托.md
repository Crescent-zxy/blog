# DOM事件与事件委托

###### W3C 标准

DOM Level 2 Event Specification

* 浏览器同时支持两种调用顺序
* 先捕获，再冒泡

### 事件捕获

* 从外向内找监听函数

* 不能被取消

### 事件冒泡

* 从内向外找监听函数
* `e.stopPropagation()` 中断冒泡，一般用于封装独立组件、

###### 不能被取消的冒泡：

* scroll event

###### 阻止滚动

* 阻止 wheel 和 touchstart 默认动作

  ```javascript
  // 找到滚动条所在元素 x
  x.addEventListener('wheel', e => {
      e.preventDefault()
  })
  x.addEventListener('touchstart', e => {
      e.preventDefault()
  })
  ```

* CSS 隐藏滚动条

  ```css
  ::-webkit-scrollbar {
      width: 0 !important
  }
  ------
  overflow: hidden  // 取消滚动条
  // 但 JS 仍可修改 scrollTop
  ```

### addEventListener

事件绑定 API

* IE5：`div.attachEvent('onclick', fn)`   // 冒泡
* 网景：`div.addEventListener('click', fn) `  // 捕获
* W3C：`div.addEventListener('click', fn, bool)`   // falsy 为冒泡，true 为捕获，默认 false

#### target & currentTarget

###### 区别

* `e.target` 用户操作的元素
* `e.currentTarget` 程序监听的元素
* this 是 e.currentTarget（不推荐使用）

#### 特例

###### 背景

* 只有一个元素被监听（没有层级关系）
* fn 分别在捕获阶段和冒泡阶段监听事件
* 点击元素就是监听元素

###### 结果

先监听先执行

### 自定义事件

```javascript
x.addEventlistener('click', () => {
    const event = new CustomEvent('zxy',{ // 事件名
        detail: {name: 'zxy', age: 18}, // 事件信息
        bubbles: true, // 是否冒泡
        cancelable: false // 冒泡是否能取消
    })
    x.dispatchEvent(event)
})
```

### 事件委托

###### 背景

* 给多个元素添加点击事件：监听祖先，冒泡时判断 target
* 监听不存在的元素：监听祖先，点击时判断

###### 优点

* 省监听数（内存）
* 监听动态元素

```javascript
x.addEventListener('click', e => {
    const t = e.target
    if(t.tagName.toLowerCase() === 'button') {
        console.log('button click')
    }
})
// 还可以给按钮添加data-id，用dataset获取以data开头的元素值来做一些限制
```

#### 封装

```javascript
function on(eventType, element, selector, fn){
    if(!(elemnt instanceof Element)){
        element = document.querySelector(element)
    }
    element.addEventListener(eventType, e => {
        const t = e.target
        t.matches(selector) && fn(e)
    })
}
------
// 递归判断
function on(eventType, element, selector, fn){
    if(!(elemnt instanceof Element)){
        element = document.querySelector(element)
    }
    element.addEventListener(eventType, e => {
        let el = e.target
        while(!el.matches(selector)) {
            if(element === el){
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el)
    })
    return element
}
```

