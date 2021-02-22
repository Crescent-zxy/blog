# 虚拟 DOM

一个能代表 DOM 树的对象，通常含有标签名、标签属性、事件监听和子元素，及其他。

```javascript
const vNode = {
    key: null,
    props: {
       children: [  // 子元素
           { type: 'span', ... },
           { type: 'span', ... }
       ],
       className: 'red',  // 标签属性
       onClick: () => {}  // 事件 
    },
    ref: null,
    type: 'div', // 标签名/组件名
    ...
}
```

###### DOM 操作

* 相比于 JS 原生 API 慢，如数组操作
* 基于 DOM 的库（Vue/React）都不可能在操作 DOM 时比 DOM 快

#### 优点

* 减少 DOM 操作：
  * 将多次操作合并为一次操作，减少操作次数
  * DOM diff 省掉多余操作，只更新改变的 DOM
* 跨平台：虚拟 DOM 还可以变成小程序、iOS 应用、安卓应用，虚拟 DOM 本质上是一个 JS 对象

#### 缺点

* 需要额外的创建函数
* 严重依赖打包工具，需要额外的构建过程

#### 创建虚拟 DOM

* ##### React.createElement

```javascript
createElement('div',{
    className:'red',
    onClick: () => {}
},{
    createElement('span',{},'span1'),
    createElement('span',{},'span2'),
})
```

* ##### JSX

```jsx
<div className="red" onClick="{() => {}}">
    <span>span1</span>
    <span>span1</span>    
</div>
// 通过 bable 转为 createElement 形式
```

### DOM diff

* 一个函数，patch

* changed = patch(oldNode, newNode)

* changed 就是要运行的 DOM 操作：

  ```javascript
  // 伪代码
  [
      { type: 'INSERT', vNode: ... },
      { type: 'TEXT', vNode: ... },
      { type: 'PROPS', propsPatch: [...] }
  ]
  ```

#### diff 逻辑

* ##### Tree dif

  * 新旧树逐层对比，找出需要更新的节点
  * 节点是组件就 Component diff
  * 节点是标签就 Element diff

* ##### Component diff

  * 节点是组件，先看组件类型
  * 类型不同直接替换
  * 类型相同则只更新属性
  * 深入组件继续 Tree diff（递归）

* ##### Element diff

  * 节点是原生标签，看标签名
  * 标签名不同直接替换
  * 相同则只更新属性
  * 进入标签后代 Tree diff（递归）

#### 问题

同级节点对比存在 bug，会出现识别错误

中间的删除会被识别为中间的修改和末尾的删除

###### 解决方法

加 key