<template>
  <div class="personalized">
    <div class="personalized-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="personalized-list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="selectMusic(item.id)"
      >
        <img v-lazy="item.picUrl" alt="图片不见了" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 个人推荐
  name: "Personalized",
  components: "",
  // props:["list","title"],
  // props校验规则
  props: {
    list: {
      // type:数据类型
      type: Array,
      // 函数的返回值为true 表示验证通过，false 表示验证失败
      required: true,
      // default:默认值
      default: [],
    },
    title: {
      type: String,
      required: true,
      default: "",
    },
    type: {
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
  methods: {
    selectMusic(id) {
      this.$emit("selectMusic", id, this.type);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.personalized {
  width: 100%;
  margin-top: 20px;
  .personalized-top {
    height: 80px;
    border-bottom: 1px solid rgb(190, 186, 186);
    h3 {
      font-size: $font_size_large;
      margin: 0 30px;
      padding-left: 20px;
      box-sizing: border-box;
      @include boder_left_color();
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      @include font_active_color();
    }
  }
  .personalized-list {
    width: 100%;
    display: flex;
    // 自动换行
    flex-wrap: wrap;
    // 四周对齐
    justify-content: space-around;
    .item {
      margin-top: 30px;
      width: 200px;
      img {
        width: 200px;
        border-radius: 10px;
      }
      p {
        margin-top: 10px;
        font-size: $font_size_medium;
        @include clamp(2);
      }
    }
  }
}
</style>
