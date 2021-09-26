<template>
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
  computed,
} from "vue";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  name: "App",
  components: { PlusCircleOutlined, MinusCircleOutlined },
  setup() {
    let vm =
      getCurrentInstance().appContext.app.config.globalProperties.$storage;

    function decrease() {
      if (vm.starValue <= 0) return;
      vm.starValue--;
    }

    function increase() {
      if (vm.starValue >= 5) return;
      vm.starValue++;
    }

    return {
      decrease,
      increase,
    };
  },
});
</script>

<style>
.btns {
  margin-top: 10px;
}
</style>
