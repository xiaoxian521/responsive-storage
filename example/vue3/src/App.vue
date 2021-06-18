<template>
  <div>
    <a-rate v-model:value="stars" :tooltips="desc" />
    {{stars}}
    <span class="ant-rate-text">{{ desc[stars - 1] }}</span>
    <div class="btns">
      <a-button @click="decrease">
        <template #icon>
          <MinusCircleOutlined />
        </template>
        减
      </a-button>
      <a-button @click="increase">
        <template #icon>
          <PlusCircleOutlined />
        </template>
        加
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  unref,
  reactive,
  getCurrentInstance,
  onMounted,
  toRefs,
  computed
} from "vue";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "App",
  components: { PlusCircleOutlined, MinusCircleOutlined },
  computed: {
    stars() {
      return Number(this.$storage.starValue);
    }
  },
  setup() {
    let vm: any;
    const desc = ref<any[]>(["一星", "二星", "三星", "四星", "五星"]);

    function decrease() {
      if (vm.starValue <= 0) return;
      vm.starValue--;
    }

    function increase() {
      if (vm.starValue >= 5) return;
      vm.starValue++;
    }

    onMounted(() => {
      vm = getCurrentInstance().appContext.app.config.globalProperties.$storage;
    });

    return {
      desc,
      decrease,
      increase
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
.btns {
  margin-top: 10px;
}
</style>
