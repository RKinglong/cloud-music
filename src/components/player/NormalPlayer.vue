<template>
  <div class="normal">
    <div class="normal-warp">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
      <PlayerBottom
        :totalTime="totalTime"
        :currentTime="currentTime"
      ></PlayerBottom>
    </div>
    <div class="normal-bg">
      <img :src="currentSong.picUrl" alt="" />
    </div>
  </div>
</template>

<script>
import PlayerHeader from "@/components/player/PlayerHeader.vue";
import PlayerMiddle from "@/components/player/PlayerMiddle.vue";
import PlayerBottom from "@/components/player/PlayerBottom.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NormalPlayer",
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom,
  },
  props: {
    totalTime: {
      type: Number,
      required: true,
      default: 0,
    },
    currentTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.setSongsLyric(this.currentSong.id);
  },
  computed: {
    ...mapGetters(["currentSong"]),
  },
  methods: {
    ...mapActions(["setSongsLyric"]),
  },
  watch: {
    currentSong(newV) {
      // 调用setSongsLyric方法写在这里是因为要将歌词传给PlayerMiddle子组件
      // 监听currentSong的变化，当songsDetail将值传给currentSong时
      // currentSong发生变化，有了id值，再将id传给setSongsLyric方法，获取歌词
      this.setSongsLyric(newV.id);
    },
  },
};
</script>

<style scoped lang="scss">
.normal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
  background-color: #000;
  .normal-warp {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
  .normal-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.7;
      // 高斯模糊
      filter: blur(30px);
    }
  }
}
</style>
