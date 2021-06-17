# responsive-storage

基于 Vue3.0 的响应式本地存储

# 安装

```
yarn install
```

# 打包

```
yarn build
```

# 使用方法

```
import { createApp, getCurrentInstance } from "vue";
const app = createApp(App);
import Storage from "responsive-storage";

app.use(Storage, {
  example: {
    type: String,
    default: Storage.getData(undefined, "example") ?? "true",
  },
});

获取和修改都可以通过getCurrentInstance().appContext.config.globalProperties.$storage.example
```

# 更新日志：

## 1.0.0

- ✨ localStorage 结合 vue3.0 实现响应式
