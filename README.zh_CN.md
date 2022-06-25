<h1 align="center">responsive-storage</h1>
<p align="center">响应式本地存储，同时支持vue2和vue3</p>

<p align="center">
<a href="https://www.npmjs.com/package/responsive-storage" target="__blank"><img src="https://img.shields.io/npm/v/responsive-storage?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/responsive-storage" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/responsive-storage?color=50a36f&label="></a>
</p>

简体中文 | [English](./README.md)  

## 🤔 开发初衷

- 在某些场景下，我们需要存储一些变量并保持响应式，目前有很多解决方案，比如 [vuex](https://vuex.vuejs.org) 、[pinia](https://pinia.vuejs.org)，但是它们在刷新页面后就会消失，在某些情况下我想让它们存在本地又不失去响应式，就诞生了 [responsive-storage](https://github.com/xiaoxian521/responsive-storage)

## 🚀 特性

- 🦾 **兼容性强**: 既支持`vue2`，又支持`vue3`，无需安装额外依赖
- ⚡ **完全可摇树**: 自带Tree-shaking，只对引入的代码进行打包
- 🧪 **完善的示例**: 目前我们在 [playgrounds](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds) 文件夹中加入了`vue2`、`vue3`示例，零学习使用成本
- 🕋 **极轻**: 源码大小`1.76 KB`，在项目中打包大小的占用空间仅用比特计算

## 📦 安装

```bash
npm install responsive-storage
or 
pnpm add responsive-storage
```

## 🦄 用法

### vue2

- main.js
```js
import Storage from "responsive-storage";
Vue.use(Storage, {
  // 必传
  version: 2, 
  // 命名空间，可不传，默认`rs-`（如果没有特殊需求建议不传）
  nameSpace: "xx_", 
  // 需要存储的响应式对象（这里需要注意一点，如果传了nameSpace，那么Storage.getData方法的第二个参数必传且和nameSpace的值保持一致，如果不传nameSpace的话，Storage.getData方法的第二个参数可不传） 
  memory: {
    starValue: Storage.getData("starValue", 'xx_') ?? 1
  }
});
```

[点击查看具体用法](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds/vue2) 

### vue3

- main.ts

```ts
import { createApp } from "vue";
import App from "./App.vue";

import Storage from "responsive-storage";
const app = createApp(App);

app.use(Storage, {
  memory: {
    starValue: Storage.getData("starValue") ?? 1
  }
});
```

[点击查看具体用法](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds/vue3)

## 许可证

[MIT © xiaoxian521-2022](./LICENSE)