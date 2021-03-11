# Hooks

* 状态：useState
* 副作用：useEffect --> useLayoutEffect
* 上下文：useContext
* Redux：useReducer
* 记忆：useMemo --> 回调：useCallback
* 引用：useRef --> useImperativeHandle
* 自定义 Hook：useDebugValue

### useState

```javascript
const [n,setN] = React.useState(0)
const [user,setUser] = React.useState({name: 'zxy'})
--- useState 接受函数 ---
const [user,setUser] = React.useState(() => ({name: 'zxy'}))
// 减少计算过程
--- setState 接受函数 ---
setN(i => i + 1)
```

###### 注意事项

* 不可局部更新

  如果 state 是一个对象，不能部分 setState，不会合并属性

* 地址要变

  setState(obj)，obj 的地址要变，否则不更新
  
* 不能在 if 里运行，可以在函数里运行

### useReducer

Flux/Redux 思想

1. 创建初始值 initialState
2. 创建所有操作 reducer(state,action)
3. 传给 userReducer，得到读和写 API
4. 调用 写({ type: '操作类型' })

```jsx
const initial = {
    n: 0
}
const reducer = (state, action) => {
    if(action.type ==='add') {
        return { n: state.n + action.number }
    } else if(action.type === 'multi') {
        return { n: state.n * 2 }
    } else {
        throw new Error('unkonw type')
    }
}
const App = () => {
    const [state, dispatch] = useReducer(reducer, initail)
    const add = () => {
        dispatch({type: 'add', number: 1})
    }
    return (
    	<div>
        	<h1>{state.n}</h1>
        	<button onClick={add}> +1 </button>
        </div>
    )
}
```

##### 代替 Redux

1. 将数据集中在一个 store 对象
2. 将所有操作集中在 reducer
3. 创建一个 Context
4. 创建对数据读写的 API
5. 将 API 放到 Context
6. 用 Context.Provider 将 Context 提供给所有组件
7. 各个组件用 useContext 获取读写 API

```jsx
const store = {
    user: 'null',
    books: 'null',
    movies: 'null'
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'setUser':
            return { ...state, user: action.user }
        case 'setBooks':
            return { ...state, books: action.books }
        case 'setMovies':
            return { ...state, movies: action.movies }
        default:
            throw new Error('unknow type')
    }
}
const Context = createContext(null)
const App = () => {
    const [state,dispatch] = useReducer(reducer,store)
    return(
    	<Context.Provider value={{state, dispatch}}>
        	<User />
            <hr />
            <Book />
            <Movies />
        </Context.Provider>
    )
}
const User = () => {
    const {state,dispatch} = useContext(Context)
    useEffect(()=>{
        ajax('user').then(user => {
        	dispatch({ type: 'setUser', user 
        })
    })
    },[])
    return (
        <div>
            <h1>个人信息</h1>
            <div>{state.user}</div>
        </div>
    )
}
```

### useContext

###### 上下文

运行一个程序所需要知道的所有变量

* 全局变量是全局的上下文
* 上下文是局部的全局变量

###### 使用方法

1. 使用 `C = createContext(initial)` 创建上下文
2. 使用 `<C.Provider>` 圈定作用域
3. 作用域内通过 `useContext(C)` 使用上下文

###### 非响应式

自顶向下，逐级更新数据

### useEffect

###### 副作用

* 对环境的改变即为副作用
* 不一定把副作用放在 useEffect 里
* 叫 afterRender 更好，每次 render 后运行

##### 用途

* 作为 `componentDidMount` 使用，[] 作为第二个参数
* 作为 `componentDidUpdate` 使用（包含第一次），可指定依赖
* 作为 `componentWillUnmount` 使用，通过 return
* 以上三种可同时存在

##### 特点

* 同时存在多个 useEffect，会按照出现顺序执行

### useLayoutEffect

###### 布局副作用

* useEffect 在浏览器渲染完成后执行
* useLayoutEffect 在浏览器渲染前执行

##### 特点

* useLayoutEffect 总是比 useEffect 先执行
* useLayoutEffect 里的任务最好影响了 Layout

##### 经验

* 为了用户体验，优先使用 useEffect （优先渲染）

### useMemo

###### React.memo

* React 默认有多余的 render
* 将组件 A 用 React.memo(A) 代替
* props 不变，A 将不会再次执行
* bug：props 里有引用类型仍会更新

###### useMemo 缓存引用类型

```jsx
const App = () => {
    const [n,setN] = useState(0)
    const onClickA = useMemo(() => {
        return () => {}
    },[依赖]) // 依赖改变时才更新该函数
    return (
    	<A data={n} onClick={onClickA} />
    )
}
const B = (props) => {
    return <div onClick={props.onClick}>{props.data}</div>
}
const A = React.memo(B)
--- 简写 ---
const A = React.memo((props) => {
    return <div onClick={props.onClick}>{props.data}</div>
})
```

##### 特点

* 第一个参数：() => value

* 第二个参数：依赖 [m,n]

* 依赖变化时才会计算新的 value

* 依赖不变，重用之前的 value

* value 是个函数，就写成 `useMemo(() => x => console.log(x))`

* useCallback 代替

  ```javascript
  useCallback(x => console.log(x), [m])
  // 等价于
  useMemo(() => x => console.log(x), [m])
  ```

### useRef

* 一个在组件不断 render 时保持不变的值
* 初始化：`const count = useRef(0)`
* 读取：`count.current`
* 变化时不会自动 render，需要手动监听并刷新 UI
* 可以引用 DOM 对象和普通对象

### forwardRef

**函数组件** 接受 ref 参数，需要用 forwardRef 包裹（类组件不用）

```jsx
const App = () => {
    const aRef = useRef(null)
    return <A ref={aRef} />
}
const A = forwardRef((props,ref) => {
    retrun <div ref={ref}>{...props}</div>
})
```

* props 不包含 ref，需要 forwardRef

### useImperativeHandle

##### setRef

对 ref 进行包装设置

```jsx
const A = React.forwardRef((props,ref) => {
    const realRef = createRef(null)
    useImperativeHandle(ref, () => ({
        x: () => { realRef.current.remove() }
    }))
    return <div ref={realRef}>{...props}</div>
})
// 此时 ref 为：
// {x: () => { realRef.current.remove()}}
```

### 自定义 Hook

##### 封装数据

```jsx
const useList = () => {
    const [list, setList] = useState(null)
    useEffect(() => {
        ajax('list').then(list => {
            setList(list)
        })
    },[])
    return { 
        list, setList,
        addItem: name => {
            setList({ ...list, { id: Math.random(), name } })
        }, // 自定义方法
        deleteItem: index => {
            setList(list.slice(0,index).concat(list.slice(index + 1)))
        }, // 自定义方法
    }
}
export defualt useList

function ajax() {
    return new Promise((resolve,reject) => {
        resolve([
            { id: 1, name: 'zxy' }
        ])
    })
}
```

### Stale Closure

##### 过时闭包

```javascript
function create(i) {
    let value = 0
    function add() {
        value += i
        console.log(value)
        const message = `Current value: ${value}`
        return function logValue() {
			console.log(message)
        }
    }
    return add
}
const a = create(1)
const log = a() // log 里的 value === 1
a()
a() // 此时 value === 3
log() // Current value: 1
```

##### 解决方法

```javascript
function create(i) {
    let value = 0
    function add() {
        value += i
        console.log(value)
        return function logValue() {
       		const message = `Current value: ${value}` 
            // 取值放到函数里
			console.log(message)
        }
    }
    return add
}
const a = create(1)
const log = a() // value === 1
a()
a() // value === 3
log() // Current value: 3
```

###### Hooks 里解决

```javascript
useEffect(() => {
    const timer = setInterval(() => {
        console.log(`Current count: ${count}`)
    },1000) // 更新时设置
    return () => { clearInterval(timer) } // 卸载组件时清除，清除的是上一次的 timer
},[count])
```

