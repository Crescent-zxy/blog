# HTML常用标签

## a

##### 属性

* href    超级链接

  使用：

  * 网址

    https://google.com（https协议）

    http://google.com（http协议）

    //google.com（无协议，会继承当前协议）

  * 路径

    a/b/c （相对目录，当前目录）以及 /a/b/c（当前服务根目录）

    index.html 以及 ./index.html

  * 伪协议

    javascript: 代码 ;  （点击后执行代码，代码为空则是什么都不做的a标签）

    mailto: 邮箱地址  （向该邮箱发邮件）

    tel: 手机号 （直接打电话）

  * id

    \#xxx （xxx为id，实现跳转）

* target    指定链接的打开窗口
  * _blank （新窗口打开）
  * _top （顶层窗口打开，多层窗口，iframe情况）
  * _parent （上一层窗口打开，多层窗口，iframe情况）
  * _self （原窗口打开）
  * xxx  (新建窗口xxx，重复利用同一个窗口)
  * iframe的name （iframe中打开）
* download   下载网页，大部分网页不支持
* rel = noopener   防止bug

##### 作用

* 跳转外部页面
* 跳转内部锚点
* 跳转到邮箱、电话等

## table

```html
# 完整版
<table>
    <thead>  # 可无
        <tr>  # table row
            <th></th>  # 表头
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th></th>  # 列表头，可无
            <td></td>  # table data
        </tr>
    </tbody>
    <tfoot>  # 可无
         <tr>  # 列表头，可无
            <th></th>
            <td></td>
        </tr>
    </tfoot>
</table>
```

##### 相关样式

* table-layout
  * auto （ 根据内容分配宽度）
  * fixed （宽度平均）
* border-collapse：collapse （边框合并）
* border-spacing （边框间隙，一般为0）

##### 单元格合并

td 标签中添加属性

* rowspan="x"  该列合并 x 行
* colspan="x"  该行合并 x 列

## img

##### 作用

发出 get 请求，展示一张图片

##### 属性

* alt（加载失败时显示）

* height  （高度）

* width  （宽度）

  宽、高二者写一，其余自适应，都写图片容易变形

* src （图片地址）

##### 事件

* onload （图片加载成功）
* onerror （图片加载失败，可用于加载挽救图）

##### 响应式

max-width: 100%

##### 可替换元素

面试可能会问，查看MDN

## form

##### 作用

发 get 或 post 请求，然后刷新页面

```html
<form action="请求地址" method="GET/POST" autocomplete="on/off">
    <input type="text" name="username">
    <input type="submit">
    <button type="submit">提交</button>  # button里可以继续加标签
</form>
```

*form表单里必须有一个 type="submit"，才能触发 submit 事件，否则无法提交*

##### 属性

* action （表单提交地址）
* autocomplete （根据name类型自动给出建议）
* method （GET/POST）
* target （同 a 标签，目标刷新页面）

##### 事件

onsubmit （提交）

## input

##### 作用

用户输入内容（单行输入）

textarea （多行输入）

select + option（选择）

##### 属性

* 类型 type：

  button / checkbox / email / file / hidden / number / password / radio / search / submit / tel / text

* 其他：

  name / autofocus / checked / disabled / maxlength / pattern / value / placehol der

* 事件

  * onchange
  * onfocus
  * onblur

* 验证器

  HTML5新增功能，如：require

##### 注意事项

* 一般不监听 input 的 click 事件
* form 里面的 input 要有 name