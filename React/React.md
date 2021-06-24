# React

* React
* ReactDOM

###### cjs 和 umd区别

* cjs 全称 CommonJS，是 Node.js 支持的模块规范
* umd 是统一模块定义，兼容各种模块规范（含浏览器）
* 理论上优先使用 umd，umd 同时支持 Node.js 和浏览器
* 最新模块规范：使用 import 和 export 关键字

###### React 元素

* createElement 的返回值 element 可以代表一个 div
* 但 element 并不是真正的 div（DOM 对象）
* 一般称 element 为虚拟 DOM 对象

###### ( ) => React 对象

* 返回 element 的函数，也可以代表一个 div
* 这个函数可以多次执行，每次得到最新的虚拟 div
* React 会对比两个虚拟 div，找出不同（DOM Diff 算法），局部更新视图

###### 元素与组件

* React 元素：`const div = React.createElement('div', ...)`
* React 组件：`const Div = () => React.createElement('div', ...)`

### JSX

```jsx
// 在 JS 文件里写 <div></div>，会被 babel 翻译为：
React.createElement('div')
// 标签里的 JS 代码用 {} 扩起来
<div>{n}</div>
--------
const A = () => (<div></div>)
<A />
// React.createElement(A)，会执行A函数
const B = <span></span>
{ B }
// 不能写成 <B />，不是函数，无法执行
```

### React.createElement

* 传入字符串 'div'，会创建一个 div
* 传入函数，会调用该函数，获取其返回值
* 传入类，会在类前面加一个 new（这会导致执行 constructor），获取一个组件对象，调用对象的 render 方法，获取其返回值

### React 组件

##### 函数组件

```jsx
function Welcome(props){
    return <h1>hello, {props.name}</h1>
}
// 使用
<Welcome name='zxy'/>
```

###### 注意事项

* 通过 setX(新值) 来更新 UI
* 没有 this，一律用参数和变量

##### 类组件

```jsx
class Welcome extends React.Component {
    render() {
        return <h1>hello, {this.props.name}</h1>
    }
}
// 使用
<Welcome name='zxy'/>
```

###### 注意事项

* 不要直接修改 state：`this.state.n += 1` 无效

  * state 改变，但 UI 不会自动更新
  * 调用 setState 才会触发 UI 更新（异步更新）
  * React 没有像 Vue 监听 data 一样监听 state

* setState 会异步更新 UI

  * setState 之后，state 不会马上改变，立马读取 state 会错误

  * 推荐方式：

    ```javascript
    this.setState(state => {
        const n = state.n + 1
        console.log(n)
        return {n}
    })
    --- 简写 ---
    this.setState(state => {
        return {n: state.n +1}
    })
    ```

* 不推荐 `this.setState(this.state)`

  * React 希望不要修改旧 state（不可变数据）
  * 常用：`setState({n: state.n + 1})`

### props

外部数据

* 类组件：直接读取属性 this.props.xxx
* 函数组件：直接读取参数 props.xxx

### state

内部数据

* 类组件：this.state 读，this.setState 写
* 函数组件：useState 返回数组，第一项读，第二项写

##### 复杂 state

* 类组件：setState 会自动合并第一层属性，但不会合并第二层

  ```javascript
  this.state = {
      user: {
          name: 'zxy'
      }
  }
  const user = Object.assign({}, this.state.user)
  // 等同于
  const user = {...this.state.user}
  user.name = 'xxx'
  this.setState({ user })
  ```

* 函数组件：setX 完全不合并

### 事件绑定

* ##### 类组件

```jsx
<button onClick={() => this.add()}> n+1 </button>

<button onClick={this.add}> n+1 </button>
// 会使 add 里的 this 变成 window
// 原因：
// React 事件调用形式：button.onClick.call(null,event)

<button onClick={this.add.bind(this)}> n+1 </button>
---- 最终写法 ----
// add 函数挂在实例对象上
class A extends React.Component{
    add = () => this.setState({n: this.state.n + 1})
	/* 等价于 */
	constructor(){
        this.add = () => this.setState({n: this.state.n + 1})
    }
	/* */
	render(){
        retrun (<button onClick={this.add}> n+1 </button>)
    }
}
---- 对比 ----
class A extends React.Component{
    add(){
        this.setState({n: this.state.n + 1})
    }
    /* 等价于 */
	add: function(){
        this.setState({n: this.state.n + 1})
    }
	/* */
	render(){
        retrun (<button onClick={this.add}> n+1 </button>)
    }
}
```

##### onChange 事件

* React 在输入时，实时触发
* HTML 在鼠标移走时触发，早于 onBlur

### 与 Vue 区别

* ##### 相同点

  * 都是对视图的封装
    * React 用类和函数表示一个组件
    * Vue 通过构造选项构造一个组件
  * 都提供了 createElement 的 XML 简写
    * React 提供 JSX 语法
    * Vue 提供模板写法

* ##### 不同点

  * React 把 HTML 写在 JS 里（HTML in JS）
  * Vue 把 JS 写在 HTML里（JS in HTML）