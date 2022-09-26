<template>
  <ul class="detail-bottom">
    <li class="play" @click="playAllMusic">
      <img src="@/assets/images/small_play_qq@2x.png" alt="图片不见了" />
      <p>播放全部</p>
    </li>
    <li
      class="item"
      v-for="(item, index) in list"
      :key="index"
      @click="playMusic(index)"
    >
      <div>
        <h3 class="music-name">{{ item.name }}</h3>
        <p class="music-author">{{ item.al.name }} - {{ item.ar[0].name }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DetailBottom",
  components: "",
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["isFullScreen"]),
  },
  methods: {
    // 将store中的actions方法映射到局部
    ...mapActions([
      "setFullScreen",
      "setSongsDetail",
      "setIsPlaying",
      "setMiniPlayer",
    ]),
    // 显示出播放页面
    playAllMusic() {
      // 让暂停按钮变为播放
      this.setIsPlaying(true);
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      // 将所有歌曲的id取出来赋值给ids，然后再传给setSongsDetail
      let allId = this.list.map((item) => {
        return item.id;
      });
      // this.$store.dispatch("setFullScreen", true);
      this.setSongsDetail({ ids: allId, index: 0 });
    },
    playMusic(index) {
      // this.$store.dispatch("setFullScreen", true);
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      this.setIsPlaying(true);
      let id = this.list.map((item) => {
        return item.id;
      });
      // 将参数封装成对象传递
      this.setSongsDetail({ ids: id, index: index });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.detail-bottom {
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  .play {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    img {
      width: 60px;
    }
    p {
      margin-left: 20px;
      font-size: $font_size_medium;
    }
  }
  .item {
    border-bottom: 1px solid #000;
    padding: 20px 20px;
    box-sizing: border-box;
    .music-name {
      font-size: $font_size_medium;
      font-weight: 700;
    }
    .music-author {
      margin-top: 10px;
      font-size: $font_size_medium;
    }
  }
}
</style>
