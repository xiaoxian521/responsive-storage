import { createApp } from "vue";
import App from "./App.vue";

import "./assets/reset.css";
import "element-plus/dist/index.css";

import Storage from "../../../dist";
// import Storage from "responsive-storage";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(Storage, {
  // nameSpace: "test_",
  memory: {
    // starValue: Storage.getData("starValue", "test_") ?? 1
    starValue: Storage.getData("starValue") ?? 1
  }
});

app.use(ElementPlus).mount("#app");
