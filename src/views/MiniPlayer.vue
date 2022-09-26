<template>
  <div class="mini-player" @click="isShow" v-show="this.isMiniPlayer">
    <ul>
      <li class="info">
        <img v-lazy="currentSong.picUrl" alt="" />
        <p>{{ currentSong.name }}-{{ currentSong.singer }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MiniPlayer",
  components: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(["setFullScreen", "setMiniPlayer"]),
    isShow() {
      this.setMiniPlayer(false);
      this.setFullScreen(true);
    },
  },
  computed: {
    ...mapGetters(["currentSong", "isMiniPlayer"]),
  },
};
</script>

<style scoped lang="scss">
@import "../assets/css/mixin.scss";
@import "../assets/css/variable.scss";
.mini-player {
  width: 100%;
  height: 120px;
  line-height: 120px;
  @include bg_color();
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  .info {
    display: flex;
    align-items: center;
    margin-left: 20px;
    color: white;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    p {
      margin-left: 20px;
      font-size: 32px;
      @include clamp(1);
    }
  }
}
</style>
