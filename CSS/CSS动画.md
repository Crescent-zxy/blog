# CSS动画

###### 原理

每过一段时间移动一小段距离，直到移动到目标点

#### 浏览器渲染原理

1. 根据 HTML 构建 HTML 树 （DOM）
2. 根据 CSS 构建 CSS 树 （CSSOM）
3. 将两棵树合并成一颗渲染树（render tree）
4. Layout 布局（文档流、盒模型、计算大小和位置）
5. Paint 位置（把边框颜色、文字颜色、阴影等画出来）
6. Composite 合成（根据层叠关系展示画面）

##### CSS渲染

渲染过程：布局（Layout）、绘制（Paint）、合成

每个属性触发的流程：[csstriggers](https://csstriggers.com)

###### 更新方式

1. 布局 -> 绘制 -> 合成（改变布局）
2. 绘制 -> 合成（不改变布局、改变部分样式如：background）
3. 合成（transform，只合成。该元素会浮起来）

### transform

###### 原理

* transform: translateX(0 => 300px)
* 直接修改会被合成，需要等一会修改
* transition 过度属性可以自动脑补中间帧
* 没有 repaint（重新绘制），比改 left 性能好

##### 常用功能

* **位移 translate**

  translateX | translateY |translate | translateZ | translate3d

  translate(-50%,-50%) 可做绝对定位元素的居中 top: 50%, left: 50%

* **缩放 scale**

  scaleX | scaleY | scale

  用得少，容易出现模糊

* **旋转 rotate**

  rotate | rotateX | rotateY | rotateZ | rotate3d

  一般用于制作 360 度旋转 loading

* **倾斜 skew**

  skewX | skewY | skew

##### 经验

* 一般需要配合 transition 过渡
* inline 元素不支持 transform，需要先变成 block

### transition

补充中间帧

##### 语法

* transition: 属性名 时长 过渡方式 延迟

* 可用 , 分隔两个不同属性

* 可用 all 代表所有属性

* 过渡方式：linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier | step-start | step-end | steps

* 无法过渡的属性：（没有过渡规律）

  display: none => block

  改为：visibility: hidden => visible

* 过渡必须要有起始，一般只有一次动画，或者两次（如：hover 和 非 hover）

###### 动画有中间点

* 使用两次 transform，用 setTimeout 或者监听 transitionend 事件，控制中间点
* 使用 animation，声明关键帧，添加动画

### animation

##### 缩写语法

**animation：时长 | 过渡方式 | 延迟 | 次数 | 方向 | 填充模式 | 是否暂停 | 动画名**

* 时长：1s 或 1000ms
* 过渡方式：同 transition，如 linear
* 次数：数字 或 infinite
* 方向：reverse | alternate（交替） | alternate-reverse
* 填充模式：none | forwards | backwards | both
* 是否暂停：paused | running

~~~css
animation: xxx 1.5s forwards;  # forwards 关键字使动画停在最后
# 第一种keyframes写法
@keyframes xxx {
    0% {
        transform: none;
    }
    66.66% {
        transform: translateX(200px);
    }
    100% {
        transform: translateX(200px) translateY(100px);
    }
}
# 第二种keyframes写法
@keyframes xxx {
    from {
        transform: translateX(0%);
    }
    to {
        transform: translateX(100%);
    }
}
~~~

#### CSS动画优化

* JS 优化

  使用 requeAnimationFrame 代替 setTImeout 或者 setInterval

* CSS优化

  使用 will-change 或 translate