# DOM

* 网页是一棵树
* 浏览器往 window 上加一个 document
* JS 通过 document 操作网页（Document Object Model 文档对象模型）
* Dom 操作是跨线程的

### 获取元素（标签）

获取到的元素是对象

* `window.idxxx` 或 `idxxx`
* `document.getElementById('idxxx')`
* `document.getElementsByTagName('div')[0]`
* `document.getElementsByClassName('red')[0]`
* `document.querySelector('#idxxx')`
* `document.querySelectorAll('.red')[0]`（不会自动更新 length）

###### 常用

* 工作中用 querySelector 和 querySelectorAll
* 自己做 demo 用 idxxx
* 兼容 IE：getElement(s)ByXXX

#### 获取特定元素

* 获取 html 元素：`document.documentElement`
* 获取 head 元素：`document.head`
* 获取 body 元素：`document.body`
* 获取窗口：`window`（窗口不是元素）
* 获取所有元素：`document.all`（**第 6 个 falsy 值**）

### 元素 6 层原型链

div -> HTMLDivElement -> HTMLElement -> Element -> Node -> EventTarget -> Object

#### 节点 Node 包括：

`x.nodeTYpe` 得到一个数字

* 1 表示元素 Element，也叫标签 Tag
* 3 表示文本 Text
* 8 表示注释 Comment
* 9 表示文档 Document
* 11 表示 文档片段 DocumentFragment

### 创建元素

* 创建标签节点：`let div 1 = document.createElement('div')`

* 创建文本节点：`text1 = document.createTextNode('xxx')`

* 标签里插入文本：

  `div1 = appendChild(text1)`

  `div1.innerText = 'xxx'` 或  `div1.textContent = 'xxx'`

  不能使用：`div1.appendChild('xxx')`

  ###### 一个元素不能出现在两个地方，除非复制一份

  `div.cloneNode(ture)`

* 插入页面：

  创建的标签默认处于 JS 线程中，需要插到 head 或者 body 中

  `document.body.appendChild(div)` 或 `已在页面中的元素.appendChild(div)`

### 删除元素

* 旧：`div1.parentNode.removeChild(div1)`
* 新：`div1.remove()`（ IE 不支持）

移除后可再添加回页面，`div1 = null` 则彻底删除，内存回收

### 改

##### 改属性

* 写标准属性
  * 改 class：`div.className = 'red blue'`（全覆盖）
  * 增加 class：`div.classList.add('red')`
  * 改 style：`div.style = 'width: 100px'`（全覆盖）
  * 改 style 的一部分：`div.style.width = '200px'`
  * 改 data-* 属性：`div.dataset.x = 'frank'`
* 读标准属性
  * `div.classList` / `a.href`
  * `div.getAttribute('class')` / `a.getAttribute('href')`

##### 改事件处理函数

* div.onclick 默认为 null

  改为一个函数 fn，点击 div 时调用：`fn.call(div,event)`

  被点击的 div 会被当做 this

  event 包含了点击事件的所有信息

##### 改内容

* 改文本内容：

  `div.innerText = 'xxx'`

  `div.textContent = 'xxx'`

* 改 HTML 内容：`div.innerHTML = '<p>xxx</p>'`

* 改标签：

  `div.innerHTML = ''`  // 先清空

  `div.appendChild(div1)` // 再加内容

### 查

* 往上查：`node.parentNode` 或 `node.parentElemnet` 或 `node.parentNode.parentNode`

* 往下查：

  * `node.chilNodes`（包括文本节点）

  * `node.children`（不包括文本节点）
  * 第一个：`node.firstChild`
  * 最后一个：`node.lastChild`

* 查姐妹：

  * `node.parentNode.childNodes` （排除自己和文本节点）
  * `node.parentNode.Children`（排除自己）
  * 上一个姐姐：
    * `node.previousSibling`（包含文本节点）
    * `node.previousElementSibling`（元素，不含文本）
  * 下一个妹妹：
    * `node.nextSibling`（包含文本节点）
    * `node.nextElementSibling`（元素，不含文本）

### DOM 操作跨线程

#### 插入新标签完整过程

* div 放入页面之前，所有操作属于 JS 线程内操作
* appendChild(div) 放入页面，浏览器发现并通知渲染线程在页面中渲染对应元素
* 放入页面后，对该 div 的操作都有可能触发重新渲染
  * 改 id 可能会
  * 改 title 可能会
  * 连续对 div 多次操作，浏览器可能会合并成一次操作（中间加读取可阻止合并）

#### 属性同步

* 标准属性和 data-* 属性的修改会被浏览器同步到页面中
* 非标准属性只停留在 JS 线程中，不会同步到页面里

##### property

JS 线程中 div 的所有属性

##### attribute

渲染引擎中 div 对应标签的属性

###### 区别

* 大部分时候，同名 property 和 attribute 值相等
* 非标准属性，只在一开始时相等
* attribute 只支持字符串
* property 还支持数字、布尔等类型

### 相关文章

- [为什么说DOM操作很慢](https://segmentfault.com/a/1190000004114594)
- [为什么经过10年的努力DOM操作还是这么慢](https://stackoverflow.com/questions/6817093/but-whys-the-browser-dom-still-so-slow-after-10-years-of-effort)