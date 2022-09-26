<template>
  <div class="song">
    <div class="song-top">
      <div class="play" @click="playAllMusic">
        <span></span>
        <p>播放全部</p>
      </div>
    </div>
    <div class="song-list">
      <ScrollView>
        <div>
          <SongListItem
            :songs="switchNum === 0 ? favList : historyList"
          ></SongListItem>
        </div>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ScrollView from "../ScrollView.vue";
import SongListItem from "../SongListItem.vue";
export default {
  name: "UserBottom",
  components: {
    ScrollView,
    SongListItem,
  },
  props: {
    switchNum: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["favList", "historyList"]),
  },
  methods: {
    ...mapActions([
      "setFullScreen",
      "setSongsDetail",
      "setIsPlaying",
      "getHistoryList",
      "setMiniPlayer",
    ]),
    playAllMusic() {
      // 让暂停按钮变为播放
      this.setIsPlaying(true);
      // 让播放界面显示
      this.setFullScreen(true);
      this.setMiniPlayer(false);
      let allId = [];
      if (this.switchNum === 0) {
        // 将所有歌曲的id取出来赋值给ids，然后再传给setSongsDetail
        allId = this.favList.map((item) => {
          return item.id;
        });
      } else {
        // 将所有歌曲的id取出来赋值给ids，然后再传给setSongsDetail
        allId = this.historyList.map((item) => {
          return item.id;
        });
      }
      this.setSongsDetail({ ids: allId, index: 0 });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
@import "@/assets/css/variable.scss";
.song {
  width: 100%;
  .song-top {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid rgb(190, 186, 186);
    display: flex;
    justify-content: center;
    align-items: center;
    .play {
      width: 260px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 32px;
      border-radius: 40px;
      border: 2px solid #000;
      span {
        width: 46px;
        height: 46px;
        @include bg_img("@/assets/images/small_play");
        margin-right: 20px;
      }
    }
  }
  .song-list {
    position: fixed;
    top: 180px;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
