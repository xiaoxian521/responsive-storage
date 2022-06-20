<template>
  <div>
    <el-tooltip content="减" placement="bottom" effect="light">
      <el-button size="small" @click="decrease"> - Decrease </el-button>
    </el-tooltip>
    <el-tooltip content="加" placement="bottom" effect="light">
      <el-button size="small" @click="increase"> + Increase </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "StarButton",
  methods: {
    decrease() {
      if (this.$storage.starValue <= 0) return;
      this.$storage.starValue--;
    },
    increase() {
      if (this.$storage.starValue >= 5) return;
      this.$storage.starValue++;
    }
  }
};
</script>
