<template>
  <div class="detail-middle">
    <img v-lazy="list" alt="" />
  </div>
</template>

<script>
export default {
  name: "DetailMiddle",
  components: "",
  props: {
    list: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.detail-middle {
  width: 100%;
  height: 500px;
  // overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
