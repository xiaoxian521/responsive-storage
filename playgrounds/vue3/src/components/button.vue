<script setup lang="ts">
import { getCurrentInstance, onBeforeMount } from "vue";

let _storage: any = null;

function decrease() {
  if (_storage.starValue <= 0) return;
  _storage.starValue--;
}

function increase() {
  if (_storage.starValue >= 5) return;
  _storage.starValue++;
}

onBeforeMount(() => {
  _storage =
    getCurrentInstance()!.appContext.app.config.globalProperties.$storage;
});
</script>

<template>
  <el-tooltip content="减" placement="bottom" effect="light">
    <el-button @click="decrease"> - Decrease </el-button>
  </el-tooltip>
  <el-tooltip content="加" placement="bottom" effect="light">
    <el-button @click="increase"> + Increase </el-button>
  </el-tooltip>
</template>
