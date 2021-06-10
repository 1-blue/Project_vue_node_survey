<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from "@/components/common/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style scoped>
#app {
}

@import "./css/reset.css";
@import "./css/common.css";
</style>
