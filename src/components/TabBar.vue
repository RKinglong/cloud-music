<template>
  <div class="tabbar">
    <router-link tag="div" to="/recommend" class="item">
      <span>推荐</span>
    </router-link>
    <router-link tag="div" to="/singer" class="item">
      <span>歌手</span>
    </router-link>
    <router-link tag="div" to="/rank" class="item">
      <span>排行</span>
    </router-link>
    <router-link tag="div" to="/search" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  components: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.tabbar {
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-around;
  font-size: $font_size_medium;
  line-height: 84px;
  background-color: #fff;
  .item {
    // & 交集选择器，两者都有
    &.router-link-active {
      @include font_active_color();
      @include boder_bottom_color();
    }
  }
}
</style>
