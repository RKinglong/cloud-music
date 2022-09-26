<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :list="banners"></Banner>
        <Personalized
          :list="personalized"
          :title="'推荐歌单'"
          :type="'p'"
          @selectMusic="fatherSelectMusic"
        ></Personalized>
        <Personalized
          :list="newalbum"
          :title="'最新专辑'"
          :type="'a'"
          @selectMusic="fatherSelectMusic"
        ></Personalized>
        <NewSong :list="newsong" :title="'推荐新歌曲'"></NewSong>
      </div>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Banner from "@/components/recommend/Banner.vue";
import Personalized from "@/components/recommend/Personalized.vue";
import ScrollView from "@/components/ScrollView.vue";
import NewSong from "@/components/recommend/NewSong.vue";
import {
  getPersonalized,
  getNewAlbum,
  getBanner,
  getNewSong,
} from "@/api/index.js";
export default {
  name: "Recommend",
  data() {
    return {
      banners: [],
      personalized: [],
      newalbum: [],
      newsong: [],
    };
  },
  created() {
    // 请求数据
    getPersonalized().then((res) => {
      this.personalized = res.data.result;
    });
    getNewAlbum().then((res) => {
      this.newalbum = res.data.albums.slice(0, 6);
    });
    getBanner().then((res) => {
      this.banners = res.data.banners.slice(0, 6);
    });
    getNewSong().then((res) => {
      this.newsong = res.data.result;
    });
  },
  methods: {
    fatherSelectMusic(id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`,
      });
    },
  },
  components: {
    Personalized,
    Banner,
    ScrollView,
    NewSong,
  },
};
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 168px;
  right: 0;
  bottom: 120px;
  left: 0;
  overflow: hidden;
  .v-enter {
    transform: translate(100%);
  }
  .v-enter-to {
    transform: translate(0);
  }
  .v-enter-active {
    transition: transform 0.2s;
  }
  .v-leave {
    transform: translate(0);
  }
  .v-leave-to {
    transform: translate(100%);
  }
  .v-leave-active {
    transition: transform 0.2s;
  }
}
</style>
