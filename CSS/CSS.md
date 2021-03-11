# CSS

Cascading Style Sheets  （层叠样式表）

CSS 2.1 使用最广泛

CSS 3 分模块

###### 发明者

Håkon Wium Lie （挪威）

### 层叠

* 样式层叠

  多次对同一选择器进行样式声明

* 选择器层叠

  不同选择器对同一个元素进行样式声明

* 文件层叠

  多个文件进行层叠

### 语法

1. ##### 样式语法

   ```css
   选择器 {
       属性名: 属性值;
   }
   ```

   ###### 注意事项

   * 所有符号都是英文
   * 区分大小写
   * 没有 // 注释
   * 浏览器会忽略错误，不会报错

2. ##### at 语法

   ```css
   @charset "UTF-8";
   @import url(xxx.css);
   media (min-width:100px) and (max-width:200px) {
       样式语法
   }
   ```

   ###### 注意事项

   * @charset 必须放在第一行
   * 前两个 at 语法以分号 ; 结尾
   * charset 字符集，UTF-8 字符编码 encoding，历史遗留问题

### 文档流

不存在内联元素和块级元素，元素本身 内联、块级或内联块级。

不要在内联里加块

* ###### 流动方向

  * inline 左到右，自身可能会换行
  * block 上到下，自身单独一行
  * inline-block 左到右，自身不会换行

* ###### 宽度

  * inline 自身宽度，不接受 width
  * block width: auto，可以指定宽度，**不要写 100%**
  * inline-block 可以接受 width 的 inline

* ###### 高度

  * inline 行高 line-height 间接决定，由字体直接决定，与 height 无关，内容为空时也有高度
  * block 内部文档流元素，无内容时高度为0，可设置 height，height 过小内容会溢出，有滚动条时只显示首屏
  * inline-block 与 block 类似，可设置 height

### overflow 溢出

当内容大于容器，会溢出，overflow 设置是否显示滚动条

* auto  灵活设置
* scroll  永远显示
* hidden  隐藏溢出部分
* visible  显示溢出部分
* overflow 可分为 overflow-x 和 overflow-y

### 脱离文档流

* position: absolue/fixed
* float: left/right

### 盒模型

##### box-sizing

* content-box 内容盒，内容是盒子边界，width = 内容宽度(content)
* boder-box 边框盒，边框是盒子边界，width = 内容宽度(content) + padding + border

### margin 合并

上下重叠合并，左右重叠不合并

合并取大的值

###### 取消合并

* parent 与 children：border、padding、overflow : hidden、display: flex
* children 与 children：display: inline-block

### position 定位

#### div分层

由底往上：background -> border -> 块级子元素 -> 浮动元素 -> 内联子元素 -> 文字

文字最高，所在元素无关，后出现的文字会覆盖前面的文字

往上一层为 z-index = 0

———  以文字为基准  ———

往下一层为 z-index = -1（低于 background）

———  不能低于HTML标签  ———

#### position

* **static** 默认值，在文档流里
* **relative** 相对定位，升起来，但不脱离文档流
  * 用于做位移（很少用）
  * 用于给 absolute 元素做 parent
  * 配合 z-index
    * z-index：默认 auto，计算出为0，不创建新层叠上下文
    * 不要写 z-index: 9999
* **absolute** 绝对定位，定位基准是祖先里最近的非 static（一般是relative）
  * 脱离原来的位置，另起一层（对话框的关闭、鼠标提示）
  * 配合 z-index
  * 某些浏览器不写 top/ left 会位置错乱
  * 善用 left: 100%，top: 100%，比如：居右：left: 100%
  * 善用 left: 50% + 负 margin / transform: translateX(-50%)
* **fixed** 固定定位，定位基准是 viewport （有坑）
  * 使用： 广告、回到顶部按钮
  * 配合 z-index
  * 手机上尽量不用这个属性
  * transform 属性会使其失效
* **sticky** 粘滞定位

##### 经验

* 写了 absolute ，一般补一个 relative
* 写了 absolute 或 fixed，一般补 top 和 left
* sticky兼容性差，一般面试用

##### 层叠上下文

* 每个层叠上下文就使一个新的小世界（作用域）
* 这个小世界里的 z-index 与外界无关
* 同一个小世界里的 z-index 才能比较
* 可以创建层叠的不正交属性：
  * z-index（不为 auto）
  * flex、opacity（值小于1）
  * transform（值不为 none）
  * position: fixed
* 负的 z-index 逃不出层叠小世界
* 文档：[层叠上下文MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)

### 基本单位

* ##### 长度单位

  * px 像素
  * em 相对自身 font-size 倍数
  * 百分数
  * 整数
  * rem
  * vw 和 vh

* ##### 颜色

  * 十六进制：#FF6600 或 # F60
  * RGBA：rgb(0,0,0) 或者 rgba(0,0,0,1)
  * hsl：hsl(360,100%,100%)

### 网站推荐

* CSS spec （官方） CSS 2.1 中文版

* caniuse.com （浏览器支持查询）
* CSS tricks   (CSS使用技巧)
* freepik 、365PSD（PSD）
* dribbble.com（UI设计）