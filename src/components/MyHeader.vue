<template>
  <!-- <div class="header" @click="myFn">
    <div class="header-left"></div>
    <div class="header-title">King的云音乐</div>
    <div class="header-right" @click.stop="user"></div>
  </div> -->
  <MainHeader class="header">
    <div slot="left" class="header-left"></div>
    <div slot="center" class="header-title">King的云音乐</div>
    <div slot="right" class="header-right" @click.stop="user"></div>
  </MainHeader>
</template>

<script>
import MainHeader from "./MainHeader.vue";
export default {
  name: "MyHeader",
  components: {
    MainHeader,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    user() {
      this.$router.push({ path: "/user" });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.header {
  .header-left {
    @include bg_img("@/assets/images/logo");
  }
  .header-right {
    @include bg_img("@/assets/images/account");
  }
}
</style>
