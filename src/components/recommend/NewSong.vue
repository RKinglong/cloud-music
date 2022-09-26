<template>
  <div class="newsong">
    <div class="newsong-top">
      <h3>{{ title }}</h3>
    </div>
    <div class="newsong-list">
      <ul>
        <li
          class="item"
          v-for="(item, index) in list"
          :key="item.id"
          @click="playMusic(index)"
        >
          <img v-lazy="item.picUrl" alt="图片不见了" />
          <div class="intro">
            <h3>{{ item.name }}</h3>
            <p>{{ item.song.album.name }} - {{ item.song.artists[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NewSong",
  components: "",
  // props:["list","title"],
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
    title: {
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
  computed: {},
  methods: {
    ...mapActions([
      "setFullScreen",
      "setSongsDetail",
      "setIsPlaying",
      "setMiniPlayer",
    ]),
    playMusic(index) {
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      let id = this.list.map((item) => {
        return item.id;
      });
      this.setSongsDetail({ ids: id, index });
      this.setIsPlaying(true);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.newsong {
  width: 100%;
  margin-top: 20px;
  .newsong-top {
    height: 80px;
    border-bottom: 1px solid #ccc;
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
  .newsong-list {
    width: 92%;
    overflow: hidden;
    margin: 0 auto;
    .item {
      display: flex;
      align-items: center;
      padding: 30px 0;
      border-bottom: 1px solid #ccc;
      img {
        width: 150px;
        border-radius: 10px;
      }
      .intro {
        padding-left: 20px;
        h3 {
          font-size: $font_size_large;
        }
        p {
          font-size: $font_size_medium;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
