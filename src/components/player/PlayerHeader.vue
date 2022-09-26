<template>
  <div class="player-header">
    <div class="left" @click="close"></div>
    <div class="title">
      <h3>{{ currentSong.name }}</h3>
      <p>{{ currentSong.singer }}</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PlayerHeader",
  components: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["isFullScreen", "currentSong"]),
  },
  methods: {
    ...mapActions(["setFullScreen", "setMiniPlayer"]),
    close() {
      this.setFullScreen(!this.isFullScreen);
      this.setMiniPlayer(true);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.player-header {
  width: 100%;
  height: 84px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    width: 84px;
    height: 84px;
  }
  .left {
    @include bg_img("@/assets/images/down");
  }
  .right {
    @include bg_img("@/assets/images/more");
  }
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    max-width: 500px;
    h3 {
      font-size: 36px;
      @include clamp(1);
    }
    p {
      font-size: 30px;
      @include clamp(1);
    }
  }
}
</style>
