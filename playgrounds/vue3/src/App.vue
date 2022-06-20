<template>
  <div class="content">
    <el-tooltip content="Vue3版本" placement="top" effect="light">
      <p>Vue3 Version</p>
    </el-tooltip>
    <el-tooltip
      content="请打开本地浏览器的LocalStorage查看rs-starValue对应值的变化并观察页面中star的变化"
      placement="top"
      effect="light"
    >
      <p>
        Please open the Local Storage of your local browser to check the change
        of the corresponding value of rs-starValue and observe the change of
        star in the page
      </p>
    </el-tooltip>

    <el-rate
      v-model="starValue"
      disabled
      show-score
      score-template="{value} Star"
    />
    <br />
    <StarButton />
  </div>
</template>

<script setup lang="ts">
import StarButton from "./components/button.vue";
import { computed, getCurrentInstance } from "vue";

let starValue = computed(() => {
  return getCurrentInstance()!.appContext.app.config.globalProperties.$storage
    .starValue;
});
</script>

<style scoped>
.content {
  width: 300px;
  height: 300px;
  margin: 70px auto;
  text-align: center;
}
</style>
