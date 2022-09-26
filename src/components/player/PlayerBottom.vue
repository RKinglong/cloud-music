<template>
  <div class="player-bottom">
    <!-- 进度条 -->
    <div class="bottom-progress">
      <span class="nowtime">{{ nowTime }}</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span class="totaltime">{{ allTime }}</span>
    </div>
    <!-- 按钮 -->
    <div class="bottom-control">
      <div class="mode" @click="changemode" ref="mode"></div>
      <div class="previous" @click="previous"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div
        class="favourite"
        @click="favourite"
        ref="favourite"
        :class="{ active: isFav(currentSong) }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import modeType from "@/store/modeType";
import { formartTime } from "@/tools/time.js";
export default {
  name: "PlayerBottom",
  components: "",
  data() {
    return {
      // 当前歌曲播放时间
      nowTime: 0,
      allTime: 0,
    };
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
  created() {
    // 将localStorage中保存的favList在刷新页面后重新赋值给favList
    let localFav = JSON.parse(window.localStorage.getItem("favList"));
    if (localFav != null) this.getFavList(localFav);
    let localHistory = JSON.parse(window.localStorage.getItem("historyList"));
    if (localHistory != null) this.getHistoryList(localHistory);
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "isPlaying",
      "modeType",
      "currentIndex",
      "currentSong",
      "favList",
      "historyList",
      "modeType",
      "songsDetail",
    ]),
  },
  methods: {
    ...mapActions([
      "setIsPlaying",
      "setModeType",
      "setCurrentIndex",
      "setCurTime",
      "setFavList",
      "getFavList",
      "setHistorySong",
      "getHistoryList",
    ]),
    // 播放或暂停
    play() {
      this.setIsPlaying(!this.isPlaying);
    },
    // 修改播放模式
    changemode() {
      if (this.modeType === modeType.loop) {
        // loop=>one
        // 读取播放状态，如果是loop设置成one
        this.setModeType(modeType.one);
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random);
      } else {
        this.setModeType(modeType.loop);
      }
    },
    // 上一首
    previous() {
      this.setCurrentIndex(this.currentIndex - 1);
    },
    // 下一首
    next() {
      if (this.modeType === 0) {
        this.setCurrentIndex(this.currentIndex + 1);
      } else if (this.modeType === 2) {
        let count = Math.floor(
          Math.random() * (this.songsDetail.length - 1) + 1
        );
        this.setCurrentIndex(count);
      }
    },
    progressClick(e) {
      // 让进度条到指定位置
      // console.log(e.pageX);
      // e.pageX当前点击位置的长度
      // this.$refs.progressBar.offsetLeft进度条移动的长度
      // this.$refs.progressBar.offsetWidth进度条总长度
      let value =
        (e.pageX - this.$refs.progressBar.offsetLeft) /
        this.$refs.progressBar.offsetWidth;
      this.$refs.progressLine.style.width = value * 100 + "%";

      // 让音频跟着进度条跳到指定位置
      let currentTime = this.totalTime * value;
      this.setCurTime(currentTime);
    },
    // 将歌曲加入到收藏歌单
    favourite() {
      this.setFavList(this.currentSong);
    },
    // 判断当前歌曲是否在favList中,true代表找到
    isFav(song) {
      let result = this.favList.find((item) => {
        return item.id === song.id;
      });
      // 找到返回true，找不到返回false
      return result !== undefined;
    },
  },
  watch: {
    isPlaying() {
      if (this.isPlaying) {
        // classList.add()添加属性
        this.$refs.play.classList.add("active");
      } else {
        this.$refs.play.classList.remove("active");
      }
    },
    // 播放模式
    modeType(newV) {
      if (newV === 0) {
        this.$refs.mode.classList.remove("activeRandom");
      } else if (newV === 1) {
        this.$refs.mode.classList.add("activeOne");
      } else {
        this.$refs.mode.classList.remove("activeOne");
        this.$refs.mode.classList.add("activeRandom");
      }
    },
    // 歌曲总时长
    totalTime(newV) {
      let time = formartTime(newV);
      this.allTime = time.minute + ":" + time.second;
    },
    // 当前歌曲播放时长
    currentTime(newV) {
      let time = formartTime(newV);
      this.nowTime = time.minute + ":" + time.second;

      // 进度条百分比
      let value = (newV / this.totalTime) * 100;
      this.$refs.progressLine.style.width = value + "%";
    },
    // 当收藏歌单有变化时，将其存到localStorage，将数据持久化
    favList(newV) {
      window.localStorage.setItem("favList", JSON.stringify(newV));
    },
    // 当历史歌单有变化时，将其存到localStorage，将数据持久化
    historyList(newV) {
      window.localStorage.setItem("historyList", JSON.stringify(newV));
    },
    currentSong() {
      // 将当前歌曲放入历史播放
      this.setHistorySong(this.currentSong);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 60px;
  width: 100%;
  // background-color: green;
  .bottom-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 25px;
    color: #fff;
    margin: 0 40px 50px 40px;
    .progress-bar {
      width: 100%;
      height: 10px;
      background-color: #fff;
      margin: 0 20px;
      .progress-line {
        width: 0;
        height: 100%;
        background-color: gray;
        position: relative;
        .progress-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fff;
          border: 1px solid #000;
          position: absolute;
          // 让小点紧跟在进度条的后面
          left: 100%;
          top: -6px;
        }
      }
    }
  }
  .bottom-control {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img("@/assets/images/loop");
      &.activeOne {
        @include bg_img("@/assets/images/one");
      }
      &.activeRandom {
        @include bg_img("@/assets/images/shuffle");
      }
    }
    .previous {
      @include bg_img("@/assets/images/prev");
    }
    .play {
      @include bg_img("@/assets/images/play");
      &.active {
        @include bg_img("@/assets/images/pause");
      }
    }
    .next {
      @include bg_img("@/assets/images/next");
    }
    .favourite {
      @include bg_img("@/assets/images/un_favorite");
      &.active {
        @include bg_img("@/assets/images/favorite");
      }
    }
  }
}
</style>
