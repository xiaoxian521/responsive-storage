<template>
  <div>
    <a-rate v-model:value="stars" :tooltips="desc" />
    {{stars}}
    <span class="ant-rate-text">{{ desc[stars - 1] }}</span>
  <buttons/>
  </div>
</template>

<script lang="ts">
import {
  ref,
  getCurrentInstance,
  computed
} from "vue";
import buttons from "./button.vue"
export default ({
  name: "App",
  components: { buttons},
  computed: {
    stars() {
      console.log(Number(this.$storage.starValue))
      return Number(this.$storage.starValue);
    }
  },
  setup() {
    
    const desc = ref<any[]>(["一星", "二星", "三星", "四星", "五星"]);

    return {
      desc,
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
</style>
