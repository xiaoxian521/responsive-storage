import Vue from 'vue'
import App from './App.vue'

import "./assets/reset.css"
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import Storage from "../../../dist"
Vue.use(Storage, {
  version: 2,
  // nameSpace: "test_",
  memory: {
    // starValue: Storage.getData("starValue", "test_") ?? 1
    starValue: Storage.getData("starValue") ?? 1
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
