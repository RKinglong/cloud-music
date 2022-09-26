<template>
  <div class="player-middle">
    <swiper :options="swiperOptions" class="banner">
      <swiper-slide class="cd">
        <div class="cd-warpper" ref="cd">
          <img :src="currentSong.picUrl" alt="" />
        </div>
        <p>{{ currentLyric[currentLineNum] }}</p>
      </swiper-slide>
      <swiper-slide class="lyric" ref="lyric">
        <ScrollView ref="scrollView">
          <ul>
            <li
              class="lyric-item"
              v-for="(item, index) in currentLyric"
              :key="index"
              :class="{ active: index === currentLineNum }"
            >
              {{ item }}
            </li>
          </ul>
        </ScrollView>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapGetters } from "vuex";
import ScrollView from "../ScrollView.vue";
export default {
  name: "PlayerMiddle",
  components: {
    swiper,
    swiperSlide,
    ScrollView,
  },
  props: {
    currentTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          // 常规分页的样式
          bulletClass: "my-bullet",
          // 激活页码的样式
          bulletActiveClass: "my-bullet-active",
        },
        observer: true,
        observeSlideChildren: true,
        observeParents: true,
      },
      currentLineNum: "0",
    };
  },
  created() {},
  mounted() {},
  computed: {
    // 将store中的getters属性映射到局部
    ...mapGetters(["isPlaying", "currentSong", "currentLyric", "currentIndex"]),
  },
  methods: {},
  watch: {
    isPlaying(newV) {
      if (newV) {
        this.$refs.cd.classList.add("active");
      } else {
        this.$refs.cd.classList.remove("active");
      }
    },
    currentTime(newV) {
      // 将时间向下取整
      let lineNum = Math.floor(newV);
      // 歌词是一个数组
      let result = this.currentLyric[lineNum];
      // 如果可以取到歌词，并且取到的歌词不是空
      if (result !== undefined && result != "") {
        this.currentLineNum = Math.floor(newV) + "";
      }
      // 获取当前高亮歌词dom元素的offsetTop(距离顶部的距离)
      let currentLyricTop =
        document.querySelector(".lyric-item.active").offsetTop;
      let lyric = this.$refs.lyric.$el.offsetHeight;
      if (currentLyricTop > lyric / 2) {
        // console.log("开始滚动");
        this.$refs.scrollView.scrollTo(0, lyric / 2 - currentLyricTop, 100);
      }
    },
    currentLyric(newValue, oldValue) {
      for (let key in newValue) {
        // 找到第一个key并返回
        this.currentLineNum = key;
        return;
      }
    },
    currentIndex() {
      this.$refs.scrollView.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.player-middle {
  position: fixed;
  top: 120px;
  bottom: 250px;
  left: 0;
  right: 0;
  .banner {
    width: 100%;
    height: 100%;
    color: #fff;
    .cd {
      text-align: center;
      .cd-warpper {
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 30px solid #fff;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 100px;
        img {
          width: 100%;
          height: 100%;
        }
        animation: xuan 5s linear infinite;
        animation-play-state: paused;
        // 交集选择器
        &.active {
          animation-play-state: running;
        }
      }
      p {
        font-size: 40px;
        margin-top: 50px;
        color: pink;
      }
    }
    .lyric {
      text-align: center;
      font-size: 32px;
      li {
        margin: 10px 0;
        &:nth-last-child(1) {
          padding-bottom: 80%;
        }
        &.active {
          font-size: 38px;
          color: pink;
        }
      }
    }
  }
}
@keyframes xuan {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
<style lang="scss">
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 20px;
}
.my-bullet-active {
  width: 50px;
  background-color: skyblue;
  border-radius: 40%;
}
</style>
