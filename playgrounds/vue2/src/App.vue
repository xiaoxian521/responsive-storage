<template>
  <div class="content">
    <el-tooltip content="Vue2版本" placement="top" effect="light">
      <p>Vue2 Version</p>
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
      v-model="$storage.starValue"
      disabled
      show-score
      score-template="{value} Star"
    />
    <br />
    <StarButton />
  </div>
</template>

<script>
import StarButton from "./components/button";

export default {
  name: "App",
  components: {
    StarButton
  }
};
</script>

<style scoped>
.content {
  width: 300px;
  height: 300px;
  margin: 70px auto;
  text-align: center;
}
</style>
