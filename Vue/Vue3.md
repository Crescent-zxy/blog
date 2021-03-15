### Vue 3

###### 与 Vue 2 区别

* 90% 的写法完全一致，除了：
* Vue 3 的 Template 支持多个根标签，Vue 2 不支持
* Vue 3 有 createApp()，Vue 2 是 new Vue()
* createApp(组件)，new Vue({ template, render })

### vite

###### 安装

```
npm init vite-app <project-name>
yarn create vite-app <project-name>
--- 等价于 ---
全局安装 create-vite-aop 然后
cva <project-name>
--- 等价于 ---
npx create-vite-app <project-name>
```

### 路由

* createMemoryHistory：内存型路由
* createWebHashHistory：Hash 型路由
* createWebHistory：History 型路由

### 组件通信

##### 内部数据

```vue
<template>
	<button @click="toggle" :class="{ checked }"></button>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const checked = ref(false)
    const toggle = () => {
      checked.value = !checked.value
    };
    return { checked, toggle };
  },
};
</script>
```

##### 内外通信

```vue
--- Parent 组件 ---
<template>
  <Switch :value="y" @input="y = $event"/>
  // 事件名可自定义，$event 获取新数据并赋值给 y
</template>
<script lang="ts">
import { ref } from 'vue';
import Switch from "../lib/Switch.vue";
export default {
  components: { Switch },
  setup(){
      const y = ref(false)
      return { y }
  }
};
</script>
--- Switch 组件 ---
<template>
  <button @click="toggle" :class="{ checked: value }"></button>
</template>
<script lang="ts">
export default {
  props: {
    value: Boolean,
  },
  setup(props, context) {
    const toggle = () => {
      context.emit("input", !props.value);
      // 触发该事件，将新数据传给 Parent
    };
    return { toggle };
  },
};
</script>
```

* ##### emit(事件名， 事件参数)

  $event 的值是 emit 的第二个参数

### v-model

* 代替以前的 v-model 和 .sync
* 新增 context.emit，与 this.$emit 作用相同（共存）
  * this.$emit 在 methods 里使用，Vue3 使用 setup 代替 methods

```vue
--- Parent 组件 ---
<template>
  <Switch v-model:value="y">  // 简化
</template>
--- Switch 组件 ---
<script lang="ts">
export default {
  props: {
    value: Boolean,
  },
  setup(props, context) {
    const toggle = () => {
      context.emit("update:value", !props.value);
      // 事件名称规范为：update:xxx
    };
    return { toggle };
  },
};
</script>
```

* ##### 要求

  * 属性名任意，假设为 x
  * 事件名必须为 "update:x"

* ##### 效果

  ```vue
  <SWitch :value="y" @update:value="y = $event"/>
  --- 简写为 ---
  <Switch v-model:value="y"/>
  ```


### 属性绑定

* 默认所有属性都绑到根元素

```vue
--- Parent ---
<Button @click="xxx" @focus="xxx" @mouseover="xxx"></Button>
--- Button ---
<template>
	<button>
    	<slot />    
    </button>
</template>
// 属性直接绑到 button 上
---
<template>
    <div>
		<button></button>
    </div>
</template>
// 属性绑到 div 上
```

* 使用 `inheritArrrs:false` 可以取消默认绑定

```vue
--- Button ---
<scrit>
export default {
	inheritAttrs: false    
}
</scrit>
```

* 使用 `$attrs` 或者 `context.attrs` 获取所有属性

* 使用 `v-bind="$attrs"` 批量绑定属性

```vue
<template>
    <div>
		<button v-bind="$attrs"></button>
    </div>
</template>
--- Button ---
<script>
export default {
	inheritAttrs: false    
}
</script>
```

* 使用 `const {onClick, ...rest} = context.attrs` 将属性分开 

```vue
<template>
    <div :size="size">
		<button v-bind="rest"></button>
    </div>
</template>
--- Button ---
<script>
export default {
	inheritAttrs: false,
    setup(props, context){
        const {size, onClick, ...rest} = context.attrs
        return {size, onClick, rest}
    }
}
</script>
```

##### 属性默认值

```vue
<template>
  <button :class="`theme-${theme}`">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  props: {
    theme: {
      type: String,
      default: "button",
    },
  },
};
</script>
--- 或者 ---
<template>
  <button :class="{[`theme-${theme}`]: theme}">
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  props: {
    theme: String
  },
};
</script>
```

###### UI 库 CSS 注意事项

* 不能使用 scoped
  * data-v-xxx 中的 xxx 每次运行可能不同
  * 必须输出稳定不变的 class 选择器，方便使用者覆盖
* 必须加前缀
  * 例如 .cat-theme-link，不容易被使用者覆盖

#### props 和 attrs

 1、「props支持 string 以外的类型，attrs 只有 string 类型」 

* props 支持的类型 attrs 都支持，可以测试下 Object 等其他类型

+ 课程上用来佐证的例子是 在父组件以「disabled」形式绑定，在 attrs 读取到空字符串，在 props 声明 Boolean 后读取到 true 
+ attrs 之所以读取到空字符串，是因为本来「disabled」绑定不给 value 时默认值就是空字符串 
+ props 读取到 true，是因为声明了disabled 为 Boolean 类型，Vue为了兼容HTML 的 Boolean attribute 规范做了处理（规范中要求 boolean attribute 不能以 true 和 false 做值，true 直接加上属性，false 则是不加/删除该属性即可）

 2、「我们又发现了一个 Vue 文档中没说明的东西，props 中没声明的东西会自动跑到 attrs」

+ Vue2/3 文档均对 $attrs 进行了说明 
+ Vue2：https://cn.vuejs.org/v2/api/#vm-attrs 和 https://cn.vuejs.org/v2/api/#vm-listeners 
+ Vue3：https://v3.vuejs.org/guide/component-attrs.html#attribute-inheritance  注：Vue2 有 $attrs 和 $listeners，Vue3 将两者合并了

#### 运行时确认子组件类型

检查 context.slots.default() 数组

```javascript
setup(props, context){
    const defaults = context.slots.default()
    // 用 JS 获取插槽内容
    defaults.forEach(tag => {
       if (tag.type !== TabPane) {
        throw new Error("Tabs 子标签必须是 TabPane");
      }
    });
}
```

##### 获取宽高和位置

```javascript
const { width, height, top,left } = el.getBoundingClientRect()
```

### 钩子

* onMounted
* onUpdated
* watchEffect

### script setup

### defineComponent

### Vue2 升级 Vue3

官方工具和教程：vue-codemod