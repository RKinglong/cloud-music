<template>
  <!-- <div class="player-header" @click="myFn">
    <div class="left" @click.stop="myBack"></div>
    <ul class="title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我喜欢的
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        播放历史
      </li>
    </ul>
    <div class="right"></div>
  </div> -->
  <MainHeader>
    <div slot="left" class="header-left" @click.stop="myBack"></div>
    <ul slot="center" class="header-title">
      <li :class="{ active: switchNum === 0 }" @click.stop="switchItem(0)">
        我喜欢的
      </li>
      <li :class="{ active: switchNum === 1 }" @click.stop="switchItem(1)">
        播放历史
      </li>
    </ul>
    <div slot="right" class="header-right"></div>
  </MainHeader>
</template>

<script>
import MainHeader from "../MainHeader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "UserHeader",
  components: {
    MainHeader,
  },
  data() {
    return {
      // 用于切换喜欢歌单和历史歌单
      switchNum: 0,
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["isFullScreen"]),
  },
  methods: {
    ...mapActions(["setFullScreen"]),
    myBack() {
      window.history.back();
    },
    switchItem(num) {
      this.switchNum = num;
      this.$emit("switchNum", num);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.header {
  .header-left {
    @include bg_img("@/assets/images/back");
  }
  .header-right {
    @include bg_img("@/assets/images/more");
  }
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    border-radius: 10px;
    li {
      font-size: 30px;
      height: 50px;
      line-height: 50px;
      padding: 5px;
      &:nth-of-type(1) {
        border-right: 3px solid #fff;
      }
      &.active {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
