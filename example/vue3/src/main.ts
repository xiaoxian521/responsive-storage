import { createApp } from "vue";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import Storage from "../../../dist";

const app = createApp(App);

app.use(Storage, {
  starValue: {
    type: String,
    default: Storage.getData(undefined, "starValue") ?? 1,
  },
});

app.use(Antd).mount("#app");
