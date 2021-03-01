# Vue

MVC 中 V 是 Vue 的重点，M 和 C 被简化

* 1.0 版是 MVVM
* 2.0 及之后是 MV*

### 使用 Vue 实例

* ##### 从 HTML 得到视图

  * 完整版 Vue

    ```javascript
    new Vue({
      el: '#app',
      data: {
          n: 1,
      },
      template: `<div>{{n}}</div>`
    })
    ```

  * 从 CDN 引用 vue.js 或 vue.min.js

  * import vue.js 或 vue.min.js

  * 配置 alias

* ##### 用 JS 构建视图

  * 使用 vue.runtime.js

  * 不能直接从 HTML 里获取视图，需要 render(h)，用 h 构建函数

    ```javascript
    import App from './App.vue'  // 使用 vue-loader 编译 .vue 文件
    
    // 使用 render 函数
    new Vue({
      render: h => h(App),
    })
    ---- 或 ----
    new Vue({
      data:{
          n: 1,
      },
      render: h => h('div',[this.n, h('span')]),
    })
    ```

  * 没有 compiler，体积小 30%

* ##### 使用 vue-loader

  * 把 .vue 文件翻译成 h 构建方法

    ```html
    // .vue 文件使用 template
    <template>
      <div id="app">
        Welcome to Your Vue.js App
      </div>
    </template>
    
    <script>
    export default {
      name: 'App',
      data(){}, // data 需要写成函数，return 一个对象
      method:{}, 
      components: {}
    }
    </script>
    
    <style>
    #app {
      color: #2c3e50;
      margin-top: 60px;
    }
    </style>
    ```

  * 这种方法 HTML 只有一个 div#app，SEO 不友好

###### SEO

* 搜索引擎优化
* 搜索引擎不停地 curl，根据 curl 结果猜测页面内容
* 页面都是用 JS 创建的 div，curl 无法识别
* 应给 curl 一点内容，把 title、descrip、keyword、h1、a 写好
* 原则：让 curl 能得到页面信息，SEO 就能正常工作

### 完整版和 runtime 版

|               | 完整版                       | runtime                             | 评价                     |
| ------------- | ---------------------------- | ----------------------------------- | ------------------------ |
| 特点          | 有 compiler                  | 无 compiler                         | compiler 占 30%  体积    |
| 视图          | 写在 HTML 或 template 选项里 | 写在 render 函数里用 h 函数创建标签 | 尤雨溪写好 h 传给 render |
| CDN 引入      | vue.js                       | vue.runtime.js                      | 生产环境加后缀 .min.js   |
| webpack 引入  | 配置 alias                   | 默认使用此版                        | 尤雨溪配置               |
| @vue/cli 引入 | 额外配置                     | 默认使用此版                        | 尤雨溪、蒋豪群配置       |

###### 实践

使用 runtime 版，配合 vue-loader 和 vue 文件

* 保证用户体验，用户下载的 JS 文件体积更小，但只支持 h 函数
* 保证开发体验，开发者可直接在 vue 文件里写 HTML 标签，不写 h 函数
* vue-loader 把 vue 文件里的 HTML 转为 h 函数

### codesandbox.io

使用 [codesandbox.io](https://codesandbox.io/]) 快速创建 vue app