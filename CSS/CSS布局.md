# CSS布局

### 布局分类

* 固定宽度布局，一般宽度为 960 / 1000 /1024 px
* 不固定宽度布局，文档流原理，文档流自适应
* 响应式布局，PC上固定宽度，手机上不固定宽度，混合布局

### 布局思路

* 从大到小，先定下大局，然后完善每个部分的小布局
* 从小到大，先完成小布局，组合成大布局

 ###### 用什么布局：

* 需要兼容IE9及以下：float 布局，左浮两个，固定宽度，不要响应式，parent 元素添加 clearfix，必要时采用 负 margin
* 不兼容IE9：flex 布局，必要时采用 负 margin
* 只兼容最新浏览器：grid 布局

### float 布局

可做：两栏、三栏、四栏、平均布局

需要计算宽度不灵活

手机页面不要用float布局

float 应付 IE

##### 步骤

* 子元素加：float: left 和 width

* **parent 元素加：.clearfix**

  ```css
  .clearfix::after {   # IE8及以下是一个 :
      content: '';
      display: block;
      clear: both;
  }
  ```

##### 经验

* 留一些空间或最后一个不设 width
* 不需要做响应式，手机上没有IE，这个布局是专门为IE准备的
* IE 6/7 存在双倍 margin bug，解决办法：
  * 针对 IE 6/7 把 margin 减半，_margin
  * 加：display: inline-block
* img 有多余时：vertical-align: top | middle;
* border 会干扰宽度，可改为 outline

##### 居中

宽度固定的块级元素

```css
width: 800px;
margin-left: auto;
margin-right: auto;
```

居中后，内容 margin 超出时，可在中间再加一层 div ，给该 div 设置 负margin，扩大范围

### flex 布局

弹性流，默认从左往右，从上往下一字排开，弹性盒模型

#### container

* **display**（把元素变成flex容器）:  flex（一行）|  inline-flex（几个 container 一行）
* **flex-direction**（item 流动方向/主轴方向）:  row（横）|  column（竖）|  row-reverse（从右往左）| column-reverse（从下到上）
* **flex-wrap**（折行）:  nowrap（不折行）|  wrap（折行）|  wrap-reverse（从下往上折）
* **justify-content**（主轴对齐方式）:  flex-start（左对齐）|  flex-end（右对齐）|  center（居中）| space-between（剩余空间放中间）|  space-around（剩余空间放周围，每个item左右获得空间相同）|  space-evenly（平均围绕）
* **align-items**（次轴对齐方式，item 高度不同）:  stretch（与最长item相同）|  flex-start（上对齐）|  flex-end（下对齐）| center（居中）| baseline（基本不用）
* **align-content**（多行，很少用) :  stretch（与最长item相同）|  flex-start（上对齐）|  flex-end（下对齐）| center（居中）|  space-between  |  space-around

### item

* **order**（改变排列顺序）:  默认为 0 ，从小到大排列

* **flex-grow**（增加宽度）：默认为 0 ，分配多余空间

  一般导航设置 flex-grow: 1;

* **flex-shrink**（减少宽度）：默认为 1 ，0 不变窄

* **flex-basis**（控制基准宽度）：默认 auto

* **align-self**（定制 align-items）：同 align-items

##### 缩写

* flex: flex-grow flex-shrink flex-basis

##### 重点常用

* display: flex
* flex-direction: row / column
* flex-wrap: wrap
* justify-content: center / space-between
* align-items: center

##### 经验

* 不要把 width 和 height 写死，除非特殊说明
* 使用 min-width / max-width / min-height / max-height
* flex 配合 margin-xxx: auto

##### 游戏练习

https://flexboxfroggy.com/#zh-cn

### Grid 布局

二维布局，网格

#### container

```css
display: grid  |  inline-grid;  # 成为 grid 容器

# 设置行和列，可自行设置几行几列
grid-template-columns: 40px 50px auto 50px 40px;  # 列
grid-template-row: 25% 100px auto;  # 行
# 生成网格线，可对线取名
# 缩写： grid-template: rows / columns

fr - free space # 平均布局
grid-template-columns: 1fr 2fr 1fr;

gap # 空隙
grid-gap: 10px;
grid-column-gap: 10px;
grid-row-gap: 15px;
```

#### item

```css
# 设置范围
.item {
    grid-colunn-start: 2;  # 列开始的线：最小 = 1
    grid-colunm-end: five;  # 列结束的线：最大 = 列数 + 1
    # 缩写：grid-column: start / end
    grid-row-start: row1-start; # 行开始的线：最小 = 1
    grid-row-end: 3;  # 行结束的线：最大 = 行数 + 1
    # 缩写：grid-row: start / end
    
    # 整体缩写：grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end
}
```

#### 分区 grid-template-areas

```css
.container {
    display: grid;
    grid-template-columns: 50px 50px 50px 50px;
    grid-template-row:auto;
    grid-template-areas:
        "header header header header"
        "main main . sidebar"  # . 代表空
        "footer footer footer footer";
}
,item-a {
    grid-area: header;
}
.item-b {
    gird-area: main;
}
.item-c {
    grid-area: sidebar;
}
.item-d {
    grid-area: footer;
}
```

##### 游戏练习

https://cssgridgarden.com/#zh-cn

### 垂直居中

如果 .parent 的 height 不写，.child：padding: 10px 0;  就能垂直居中；
如果 .parent 的 height 写死了，就很难把 .child 居中；
忠告：能不写 height 就千万别写 height

* tabel 自带功能

  ```html
  <table class="parent">
      <tr>
        <td class="child">
       	xxx // 自动居中
        </td>
      </tr>
    </table>
  ```

* 100% 高度的 afrer before 加上 inline block

  ```html
  <div  class="parent">
      <div class="child">
          xxx
      </div>
  </div>
  ```

  ```css
  .parent{
    border: 3px solid red;
    height: 600px;
    text-align: center;
  }
  
  .child{
    border: 3px solid black;
    display: inline-block;
    width: 300px;
    vertical-align: middle;
  }
  
  .parent:before, .parent:after{
    content:'';
    outline: 3px solid red;
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
  ```

* div 装成 table

  ```html
  <div class="table">
      <div class="td">
          <div class="child">
           xxx
          </div>
      </div>
  </div>
  ```

  ```css
  div.table{
    display: table;
    border: 1px solid red;
    height: 600px;
  }
  
  div.tr{
    display: table-row;
    border: 1px solid green;
  }
  
  div.td{
    display: table-cell;
    border: 1px solid blue;
    vertical-align: middle;
  }
  .child{
    border: 10px solid black;
  }
  ```

* margin-top: -50%

  ```css
  .parent{
    height: 600px;
    border: 1px solid red;
    position: relative;
  }
  .child{
    border: 1px solid green;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    height: 100px;
    margin-top: -50px;
  }
  ```

* translate: -50%

  ```css
  .parent{
    height: 600px;
    border: 1px solid red;
    position: relative;
  }
  .child{
    border: 1px solid green;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  ```

* absolute margin auto

  ```css
  .parent{
    height: 600px;
    border: 1px solid red;
    position: relative;
  }
  .child{
    border: 1px solid green;
    position: absolute;
    width: 300px;
    height: 200px;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  ```

* flex

  ```css
  .parent{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

### 草图软件

* Balsamiq
* Figma
* 墨刀
* Adobe XD

