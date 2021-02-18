# MVC

一种架构设计模式，通过关注点分离改进应用程序组织。

每个模块都可以写成三个对象

* M - Model（数据模型）：负责操作所有数据
* V - View（视图）：负责所有 UI 界面
* C - Controller（控制器）：负责其他

##### 伪代码模拟

```javascript
// Model
const m = {
    data: x   // 储存数据
}
// View
const v = {
    el: el, // el 容器，放置动态渲染的 HTML
    html: `<div>我是需要渲染的{{x}}</div>`, // 需要渲染的 HTML
    render(v.el){
        // 渲染函数，渲染及数据替换
    } 
}
// Controller
const c = {
    events: {
        "click #add": "add",
        "click #reduce": "reduce"
    },
    add(){
        m.data.x += 1
        v.render()
    },
    reduce(){
        m.data.x -= 1
        v.render()
    },
    autoEventSBind: {
       // 事件绑定
    }
}
```

### EventBus

一种观察者设计模式，主要用于组件/对象间通信的优化简化

```javascript
const eventBus = $(window)
// 触发事件
eventBus.trigger('事件名')
// 监听事件并响应
eventBus.on('事件名', <执行函数>)
// 实现组件间通信
```

#### 表驱动编程

* 一种编程模式
* 表：一种数据结构，比如哈希表
* 在表中查找信息，减少逻辑语句

```javascript
// 把数字变成星期
let arr = [0,1,2,2,3,3,3,4,4,4,4,6]
const hashMap = ['周日','周一','周二','周三','周四','周五','周六']
let arr2 = arr.map(item => hashMap[item])
console.log(arr2)
// ['周日', '周一', '周二', '周二', '周三', '周三', '周三', '周四', '周四', '周四', '周四','周六']
```

#### 模块化

* 页面的功能越来越多，代码越来越复杂
* 把功能拆分成模块化，规范开发，提高多人合作开发效率
* 各子模块之间解耦，最小关注点原则，提高代码可维护性，避免相互干扰
* 封装组件、类、函数，增加代码复用性

[前端MVC变形记](https://efe.baidu.com/blog/mvc-deformation/)

