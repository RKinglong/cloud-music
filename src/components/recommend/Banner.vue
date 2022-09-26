<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item, index) in list" :key="index">
        <img :src="item.pic" alt="图片不见了" lazy-load />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/6</div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Banner",
  components: {},
  // props:["list"],
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    onChange(index) {
      this.current = index;
    },
  },
};
</script>

<style scoped lang="scss">
.my-swipe {
  width: 100%;
  position: relative;
  .van-swipe-item {
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .custom-indicator {
    position: absolute;
    color: white;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
