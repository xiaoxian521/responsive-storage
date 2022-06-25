<h1 align="center">responsive-storage</h1>
<p align="center">Responsive local storage, supports vue2 and vue3</p>

<p align="center">
<a href="https://www.npmjs.com/package/responsive-storage" target="__blank"><img src="https://img.shields.io/npm/v/responsive-storage?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/responsive-storage" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/responsive-storage?color=50a36f&label="></a>
</p>

English | [简体中文](./README.zh_CN.md)

## 🤔 Original intention of development

- In some scenarios, we need to store some variables and keep it responsive, there are many solutions, such as [vuex](https://vuex.vuejs.org), [pinia](https://pinia.vuejs.org), but they disappear after refreshing the page, in some cases I want them to exist locally without losing responsiveness, so was born [responsive-storage](https://github.com/xiaoxian521/responsive-storage)

## 🚀 Features

- ⚡ **Strong compatibility**: supports both `vue2` and `vue3`, no need to install additional dependencies
- ⚡ **Fully tree-shaking**: Comes with Tree-shaking, only packages the imported code
- 🧪 **Complete example**: Currently we have added `vue2`, `vue3` examples in the [playgrounds](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds) folder , zero learning usage cost
- 🦾 **Extremely Light**: The source code size is `1.76 KB`, and the footprint of the package size in the project is only calculated in bits

## 📦 install

```bash
npm install responsive-storage
or
pnpm add responsive-storage
````

## 🦄 Usage

### vue2

- main.js
````js
import Storage from "responsive-storage";
Vue.use(Storage, {
  // must pass
  version: 2, 
  // Namespace, optional, default `rs-` (not recommended if there is no special requirement)
  nameSpace: "xx_", 
  // The responsive object that needs to be stored (it should be noted here that if nameSpace is passed, the second parameter of the Storage.getData method must be passed and the value of nameSpace must be the same. If nameSpace is not passed, the second parameter of Storage.getData method parameters can be omitted) 
  memory: {
    starValue: Storage.getData("starValue", 'xx_') ?? 1
  }
});
````

[Click to view the specific usage](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds/vue2)

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
````

[Click to view the specific usage](https://github.com/xiaoxian521/responsive-storage/tree/main/playgrounds/vue3)

## License

[MIT © xiaoxian521-2022](./LICENSE)