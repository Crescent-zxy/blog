# Redux

### reducer

规范 state 创建流程

```jsx
const reducer = (state, {type, payload}) => {
    if(type === "update"){
        return {
            ...state,
            ...payload,
        }
    } else {
        return state
    }
}
// 使用
setState(reducer(oldState,{type:"update",payload: newState}))
```

### dispatch

规范 setState 流程

```jsx
// 对 setState 的过程进行一层封装
const dispatch = (action) => {
    setState(reducer(oldState, action))
}
dispatch({type: "update", payload: newState})
// 但问题是 dispatch 函数里无法取得 oldState 和 setState
// 进行一层封装包裹
const Wrapper = () => {
    const {oldState, setState} = useContext(appContext)
    const dispatch = (action) => {
       setState(reducer(oldState, action)) 
    }
    return <App dispatch={dispatch} state={oldState}>
}
const App = ({dispatch, state}) => {
	const onChange = (e) => {
        dispatch({type: "update", payload: {name: e.target.value}})
    }
    return (
    	<input value={state.name} onChange={onChange} />
    )
}
```

### Connect

创建 Wrapper，将组件与全局状态连接起来

```jsx
// 高阶组件：一个函数接受一个组件，返回一个新的组件
const connect = (Component) => {
    return (props) => {
        const {oldState, setState} = useContext(appContext)
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
        }
        return <Component {...props} dispatch={dispatch} state={oldState}>
    }
}
// 使用
const app = ({dispatch, state}) => {
	const onChange = (e) => {
        dispatch({type: "update", payload: {name: e.target.value}})
    }
    return (
    	<input value={state.name} onChange={onChange} />
    )
}
const App = connect(app)
```

减少 render，将 state 放入 store

```jsx
const store = {
    state: oldState,
    setState(newState){
        store.state = newState
    },
}
const connect = (Component) => {
    return (props) => {
        const {oldState, setState} = useContext(appContext)
        // 此处拿到的是 store 里的
        const [,update] = useState({})
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
           // 调用了 store 里的 setState，但不会引起刷新
           update({})
           // 刷新视图，保证被 connect 包裹的组件才会刷新
        }
        return <Component {...props} dispatch={dispatch} state={oldState}>
    }
}
```

每一个组件都有一个 dispatch，当前组件触发不会引起其他组件触发，需要引入订阅机制

```jsx
const store = {
    state: oldState,
    setState(newState){
        store.state = 
        store.listeners.map(fn => fn(store.state))
        // 修改数据后通知监听者，并传入最新数据
    },
    listeners: [], // 订阅队列
    subscribe(fn){
        store.listeners.push(fn) // 添加监听
        return () => {
            // 移除监听
            store.listeners = store.listeners.filter(item => item !== fn)
        }
    }
}
const connect = (Component) => {
    return (props) => {
        const {oldState, setState} = useContext(appContext)
        // 此处拿到的是 store 里的
        const [,update] = useState({})
        useEffect(()=>{
           store.subscribe(()=>{
               // 订阅，数据更新后执行刷新
               update({})
           })
        },[])
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
           // 调用了 store 里的 setState，但不会引起刷新
        }
        return <Component {...props} dispatch={dispatch} state={oldState}>
    }
}
```

### Redux

```jsx
const store
const reducer
const connect
const appContext = React.createContext(null)
export {store, connect, appContext}
```



-----------

### connect 拓展

#### selector

可选获取 state

```jsx
const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState} = useContext(appContext)
        const [,update] = useState({})
        const data = selector ? selector(state) : {state}
        // 获取部分 state
        useEffect(()=>{
           store.subscribe(()=>{
               update({})
           })
        },[])
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
        }
        return <Component {...props} dispatch={dispatch} {...data}>
    }
}
// 使用
connect(state => (user: state.user))(app)
connect()(app)
```

不同 state 部分精准渲染

```jsx
const changed = (oldState, newState) => {
     let changed = false
     for(let key in oldState){
         if(oldState[key] !== newState[key]){
             changed = true
         }
     }
    return changed
}
const connect = (selector) => (Component) => {
    return (props) => {
        const {state, setState} = useContext(appContext)
        const [,update] = useState({})
        const data = selector ? selector(state) : {state}
        useEffect(() => store.subscribe(()=>{
               const newDate = selector ? selector(store.state) : {state: store.state}
               // 做一层对比，是否要渲染
               if(changed(data, newDate)){
               	  update({})
               }
           }),[selector])
           // 这里最好 取消订阅，否则在 selector 变化时会出现重复订阅       		
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
        }
        return <Component {...props} dispatch={dispatch} {...data}>
    }
}
```

#### mapDispatchToProps

connect(selector, mapDispatchToProps)(组件)

```jsx
const connect = (selector,dispatchSelector) => (Component) => {
    return (props) => {
        const dispatch = (action) => {
           setState(reducer(oldState, action)) 
        }
        const {state, setState} = useContext(appContext)
        const [,update] = useState({})
        const data = selector ? selector(state) : {state}
        const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : {dispatch}
        // 获取自定义 dispatch
        useEffect(()=>{
           store.subscribe(()=>{
               update({})
           })
        },[])        
        return <Component {...props} {...dispatchers} {...data}>
    }
}
// 使用
connect(null,(dispatch => updateUser: (attrs) => dispatch({type: 'update', payload: attrs})))(app)
connect()(app)
```

#### 封装 connector

```jsx
const userSelector = state => ({user: state.user})
const userDispatcher = dispatch => updateUser: attrs => dispatch({type: 'updateUser', payload: attrs})
export const connectToUser = connect(userSelector, userDispatcher)
// 使用
const User = connectToUser(({user, updateUser}) => {
    const onChange = e => {
        updateUser({name: e.target.value})
    }
   	return <div>User: {user.name}</div>
})
```

### CreateStore

createStore(reducer, initState)

```jsx
const store = {
    state: undefined,
    reducer: undefined,
    ....
}
export const createStore = (reducer, initState) => {
    store.state = initState
    store.reducer = reducer
    return store
}
// 使用
const reducer = (state, {type, payload}) => {
    if(type === "update"){
        return {
            ...state,
            ...payload,
        }
    } else {
        return state
    }
}
const initState = {
    user: {name: 'zxy', age: 18}
}
const store = createStore(reducer, initState)
```

另一种封装

```jsx
let state = undefined
let reducer = undefined
let listeners = []
const setState = (newState) => {
    state = newState
    listeners.map(fn => fn(state))
}
const store = {
    getState(){
        return state
    },
    dispatch: (action) => {
		setState(reducer(state, action))
    },
    subscribe(fn){
        listeners.push(fn) // 添加监听
        return () => {
            listeners = listeners.filter(item => item !== fn)
        }
    },
    /* 
    replaceReducer(newReducer){
        reducer = newReducer
    }
    */
}
export const createStore = (_reducer, initState) => {
    state = initState
    reducer = _reducer
    return store
}
```

### Provider

```jsx
export const Provider = ({store, children}) => (
	<appContext.Provider value={store}>
        {children}
    </appContext.Provider>
)
```

### 异步 action

#### 函数 action

redux-thunk

```jsx
let dispatch = store.dispatch
const prevDispatch = dispatch
dispatch = action => {
    if(action instanceof Function){
        action(dispatch)
    } else {
        prevDispatch(action)
    }
}
// 使用
const fetchUser = dispatch => {
    ajax('/user').then(response => {
        dispatch({type: 'update', payload: response.data})
    })
}
dispatch(fetchUser)
```

#### Promise Action

redux-promise

```jsx
dispatch = action => {
    if(action.payload instanceof Promise){
        action.payload.then(data => {
            dispatch({...action, payload: data})
        })
    } else {
        prevDispatch(action)
    }
}
// 使用
dispatch({type: 'update', payload: ajax('/user').then(response => response.data)})
```

#### 中间件

createStore 第三个参数

createStore(reducer, initState, applyMiddleware(reduxThunk, reduxPromise))

一个 middleware 就是一个函数，这个函数会修改 dispatch
