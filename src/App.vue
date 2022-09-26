<template>
  <div id="app">
    <my-header></my-header>
    <tab-bar></tab-bar>
    <MiniPlayer></MiniPlayer>
    <Player></Player>
    <!-- 
      include 只有名称匹配的组件会被缓存
      exclude 被匹配的名称不会被缓存
      max 最大缓存组件数
      lur算法
      不常用的最先被淘汰（先进先出）
    -->
    <keep-alive include="Singer,Search">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
// 1.导入组件
import MyHeader from "@/components/MyHeader.vue";
import TabBar from "./components/TabBar.vue";
import Player from "./views/Player.vue";
import MiniPlayer from "./views/MiniPlayer.vue";
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    myFn(theme) {
      // documentElement根节点
      // H5中所有属性都是data-开头
      document.documentElement.setAttribute("data-theme", theme);
    },
  },
  // 2.注册子组件
  components: {
    MyHeader,
    TabBar,
    Player,
    MiniPlayer,
  },
};
</script>
<style lang="scss" scoped></style>
