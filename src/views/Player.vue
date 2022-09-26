<template>
  <div class="player" v-show="this.isFullScreen">
    <!-- 普通播放器 -->
    <NormalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NormalPlayer>
    <!-- timeupdate事件在音频/视屏的播放位置发生改变时触发 -->
    <audio
      autoplay
      @timeupdate="timeupdate"
      :src="currentSong.url"
      ref="audio"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NormalPlayer from "@/components/player/NormalPlayer.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Player",
  components: {
    NormalPlayer,
  },
  data() {
    return {
      totalTime: 0,
      currentTime: 0,
    };
  },
  created() {},
  mounted() {
    this.$refs.audio.oncanplay = () => {
      // 获取歌曲总时长
      // 将其传给NormalPlayer，再传给PlayerBottom
      this.totalTime = this.$refs.audio.duration;
    };
  },
  computed: {
    ...mapGetters([
      "isFullScreen",
      "isPlaying",
      "currentSong",
      "currentIndex",
      "curTime",
      "historyList",
      "modeType",
      "songsDetail",
    ]),
  },
  methods: {
    ...mapActions(["setHistorySong", "setCurrentIndex"]),
    timeupdate(e) {
      // e.target触发事件的dom元素
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.modeType === 0) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === 1) {
        this.$refs.audio.play();
      } else {
        let count = Math.floor(
          Math.random() * (this.songsDetail.length - 1) + 1
        );
        this.setCurrentIndex(count);
      }
    },
  },
  watch: {
    isPlaying(newV) {
      if (newV) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    currentIndex(newV) {
      // oncanplay事件在用户可以开始播放视频/音频时触发
      this.$refs.audio.load.oncanplay = () => {
        if (newV) {
          this.$refs.audio.play();
        } else {
          // 1.这里的暂停执行在audio标签的autoplay之前
          // 所以当前一首暂停之后,虽然isPlaying为false,但是歌曲还是自动播放了
          // 设置oncanplay事件解决
          this.$refs.audio.pause();
        }
      };
    },
    curTime(newV) {
      // currentTime时audio标签中的一个属性，代表当前歌曲播放的时间
      this.$refs.audio.currentTime = newV;
    },
  },
};
</script>

<style scoped lang="scss">
.player {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
}
</style>
