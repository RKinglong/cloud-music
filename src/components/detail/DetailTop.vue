<template>
  <MainHeader class="header">
    <div slot="left" class="header-left" @click.stop="myBack"></div>
    <div slot="center" class="header-title">{{ title }}</div>
    <div slot="right" class="header-right"></div>
  </MainHeader>
</template>

<script>
import MainHeader from "../MainHeader.vue";
export default {
  name: "MyHeader",
  components: {
    MainHeader,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    myBack() {
      window.history.back();
      // this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.header {
  position: fixed;
  z-index: 5;
  .header-left {
    @include bg_img("@/assets/images/back");
  }
  .header-right {
    @include bg_img("@/assets/images/more");
  }
}
</style>
