<template>
  <div class="header" @click="changeTheme">
    <slot name="left" class="header-left">左</slot>
    <slot name="center" class="header-title">中</slot>
    <slot name="right" class="header-right">右</slot>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  components: "",
  data() {
    return {
      colors: ["theme1", "theme2", "theme3"],
      idx: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeTheme() {
      this.idx++;
      if (this.idx >= this.colors.length) {
        this.idx = 0;
      }
      document.documentElement.setAttribute(
        "data-theme",
        this.colors[this.idx]
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.header {
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include bg_color();
  color: white;
  font-size: $font_size_large;
  .header-title {
    line-height: 84px;
    font-weight: 700;
    @include clamp(1);
  }
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    line-height: 84px;
  }
}
</style>
