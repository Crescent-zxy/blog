# Class 组件

### 创建方式

* #### ES5

```jsx
import React from 'react'

const A = React.createClass({
    render() {
        return <div>hi</div>
    }
})

export default A
// ES5 不支持 class
```

* #### ES6

```jsx
import React from 'react'

class B extends React.Component {
    // constructor 可不写
    constructor(props) {
        super(props)
    }
    render() {
        return <div>hi</div>
    }
}

export default B
```

### props

```jsx
<A name={this.state.name} onClick={this.onClick}>hi</A>
// 外部数据被包装为一个对象
{
    name: 'zxy',
    onClick: ..., // 回调，传函数地址
    children: 'hi', // 多个 children 传数组
}
```

###### 初始化

```javascript
constructor(props) {
    super(props)  // 将 props 加到 this 上，this.props 就是外部数据对象的地址
}
// 要么不初始化（不写 constructor）
// 要么初始化写全套（不写 super 报错）
```

###### 作用

* 接受外部数据
  * 只能读不能写
  * 外部数据由 Parent 组件传递
* 接受外部函数
  * 在恰当时机调用该函数
  * 该函数一般是 Parent 组件的函数

#### componentWillReceiveProps

组件接受新 props 时触发，已弃用

更名为：UNSAFE_componentWillReceiveProps

### state

###### 初始化

```javascript
constructor(props){
    supper(props);
    this.state = {
        user: {
            name: 'zxy'
        }
    }
}
```

###### 读

this.state.xxx

###### 写

```javascript
this.setState(newState, fn)
// setState 异步更新，会在当前代码执行完后更新 state，从而触发 UI 更新
// fn 会在写入成功后执行
--- 推荐用法 ---
this.setState((state,props) => newState, fn)
this.setState(state => ({n: state.n + 1}))
```

###### shallow merge

setState 会自动将新 state 与旧 state 进行一级合并

### ref

创建引用

```jsx
class A extends React.Component{
    divRef = undefined
    constructor(props){
        super(props)
        this.divRef = React.creatRef()
    }
    componentDidMount(){
        const div = this.divRef.current
    }
    render(){
        return <div ref={this.divRef}>hi</div>
    }
}
```

### 生命周期

```javascript
let div = document.createElement('div')
// create/construct 过程
div.textContent = 'hi'
// 初始化 state
document.body.appendChild(div)
// mount 过程
div.textContent = 'hello'
// update 过程
div.remove()
// unmount 过程
```

* #### constructor()

  * 初始化 props

  * 初始化 state，此时不能调用 setState

  * bind this

    ```javascript
    constructor() {
        this.onClick = this.onClick.bind(this)
    }
    --- 新语法 ---
    constructor() {}
    onClick = () => {}
    ```

  * 可不写（只初始化 props 时）

* ###### static getDerivedStateFormProps()

* #### shouldComponentUpdate()

  * return true 不阻止 UI 更新
  * return false 阻止 UI 更新
  * 作用：手动判断是否进行组件更新，根据应用场景灵活设置返回值，避免不必要更新
  * React.PureComponent 会进行浅对比，可代替
  * 参数：nextProps、nextState

* #### render()

  创建虚拟 DOM，展示视图

  * 只能有一个根元素
  * 如果有两个根元素，用 `<React.Fragment>` 包裹
  * `<React.Fragment />` 可缩写为 `<></>`
  * render 里可以写 if...else、三元表达式、array.map()
  * render 里不能写 for 循环，需要用数组

* ###### getSnapshotBeforeUpdate()

* #### componentDidMount()

  组件已出现在页面

  * 元素插入页面后执行代码，这些代码依赖 DOM
  * 比如：获取 div 高度
  * 发起加载数据的 AJAX 请求（官方推荐）
  * 首次渲染会执行此钩子

* #### componentDidUpdate()

  组件已更新

  * 视图更新后执行代码
  * 也可以发起 AJAX 请求，用于更新数据
  * 在此处 setState 可能会引起无限循环，除非放在 if 里
  * 若 shouldComponentUpdate 返回 false，不触发此钩子
  * 首次渲染不会执行此钩子
  * 参数：prevProps、prevState、snapShot

* #### componentWillUnmount()

  组件将卸载

  * 组件将要被移出页面然后被销毁时执行代码
  * unmount 过的组件不会再次 mount
  * 取消监听、取消 timer、取消 AJAX 请求

* ###### static getDerivedStateFormError()

* ###### componentDidCatch()

#### 执行顺序

###### 首次渲染

constructor --> render --> componentDidMount

###### 更新

props 改变 / setState() / forceUpdate() 

--> shouldComponentUpdate() --> false --> 结束

--> shouldComponentUpdate() --> true --> render --> 更新 UI --> componentDidUpdate

###### 销毁

componentWillUnmount