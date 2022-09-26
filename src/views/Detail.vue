<template>
  <div class="detail">
    <DetailTop :title="playlist.name"></DetailTop>
    <DetailMiddle :list="playlist.coverImgUrl" ref="middle"></DetailMiddle>
    <div class="detail-list">
      <ScrollView ref="scrollview">
        <DetailBottom :list="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailTop from "@/components/detail/DetailTop.vue";
import DetailMiddle from "@/components/detail/DetailMiddle.vue";
import DetailBottom from "@/components/detail/DetailBottom.vue";
import ScrollView from "@/components/ScrollView.vue";
import {
  getPersonalizedDetail,
  getAlbumDetail,
  getSingerDetail,
  getTopList,
} from "@/api/index.js";
export default {
  name: "Detail",
  components: {
    DetailTop,
    DetailMiddle,
    DetailBottom,
    ScrollView,
  },
  data() {
    return {
      playlist: {},
    };
  },
  created() {
    // 推荐歌单详情数据
    if (this.$route.params.type === "p") {
      getPersonalizedDetail(this.$route.params.id).then((res) => {
        this.playlist = res.data.playlist;
      });
    } else if (this.$route.params.type === "a") {
      // 推荐专辑详情数据
      getAlbumDetail(this.$route.params.id).then((res) => {
        this.playlist = {
          name: res.data.album.name,
          coverImgUrl: res.data.album.picUrl,
          tracks: res.data.songs,
        };
      });
    } else if (this.$route.params.type === "singer") {
      // 歌手详情数据
      getSingerDetail(this.$route.params.id).then((res) => {
        console.log(res);
        this.playlist = {
          name: res.data.artist.name,
          coverImgUrl: res.data.artist.picUrl,
          tracks: res.data.hotSongs,
        };
      });
    } else if (this.$route.params.type === "rank") {
      // 排行榜详情
      getTopList(this.$route.params.id).then((res) => {
        this.playlist = {
          name: res.data.playlist.name,
          coverImgUrl: res.data.playlist.creator.backgroundUrl,
          tracks: res.data.playlist.tracks,
        };
      });
    }
  },
  mounted() {
    // 获取图片的高度(包含边框、padding、内容)
    // $el为根dom节点
    let defaultHeight = this.$refs.middle.$el.offsetHeight;
    // 使用scrollview中的scrolling方法
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY > 0) {
        // 缩放比例
        let scale = 1 + Math.abs(offsetY) / defaultHeight;
        this.$refs.middle.$el.style.transform = `scale(${scale})`;
        // 设置高斯模糊
        this.$refs.middle.$el.style.filter = `blur(${scale * 10}px)`;
        if (offsetY < 1) {
          this.$refs.middle.$el.style.filter = `blur(0px)`;
        }
      }
    });
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  .detail-list {
    position: fixed;
    top: 584px;
    left: 0;
    bottom: 120px;
    right: 0;
    // z-index: 1;
  }
}
</style>
