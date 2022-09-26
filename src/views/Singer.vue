<template>
  <div class="singer">
    <ScrollView ref="scrollView">
      <ul>
        <li
          v-for="(item, index) in singers"
          :key="index"
          class="list"
          ref="group"
        >
          <h2 class="keys">{{ keys[index] }}</h2>
          <ul>
            <li
              class="singers"
              v-for="(value, index) in singers[index]"
              :key="index"
              @click="selectArtists(value.id)"
            >
              <img v-lazy="value.img1v1Url" alt="图片不见了" />
              <span>{{ value.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="keyList">
      <li
        v-for="(words, index) in keys"
        :key="index"
        @click="clickKey(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ words }}
      </li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''">{{ fixTitle }}</div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ScrollView from "@/components/ScrollView.vue";
import { getAllSingers } from "@/api/index.js";
export default {
  name: "Singer",
  components: {
    ScrollView,
  },
  data() {
    return {
      keys: [],
      singers: [],
      currentIndex: 0,
      groupTop: [],
      scrollY: 0,
    };
  },
  created() {
    getAllSingers().then((res) => {
      this.keys = res.keys;
      this.singers = res.list;
    });
  },
  mounted() {
    this.$refs.scrollView.scrolling((y) => {
      this.scrollY = y;
      if (y >= 0) {
        this.currentIndex = 0;
        return;
      }
      for (let i = 0; i < this.groupTop.length - 1; i++) {
        let pre = this.groupTop[i];
        let next = this.groupTop[i + 1];
        if (-y >= pre && -y <= next) {
          this.currentIndex = i;
          return;
        }
      }
      // this.currentIndex = this.groupTop.length - 1;
    });
  },
  updated() {},
  methods: {
    selectArtists(id) {
      this.$router.push({ path: `/singer/detail/${id}/singer` });
    },
    clickKey(index) {
      this.currentIndex = index;
      let offsetY = this.groupTop[index];
      this.$refs.scrollView.scrollTo(0, -offsetY);
    },
  },
  computed: {
    fixTitle() {
      if (this.scrollY > 0) {
        return "";
      } else {
        return this.keys[this.currentIndex];
      }
    },
  },
  watch: {
    singers() {
      // $nextTick会将回调函数放在下次DOM更新之后执行
      this.$nextTick(() => {
        this.$refs.group.forEach((item) => {
          this.groupTop.push(item.offsetTop);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variable";
@import "@/assets/css/mixin";
.singer {
  position: fixed;
  bottom: 120px;
  top: 170px;
  left: 0;
  right: 0;
  overflow: hidden;
  padding: 0 20px;
  box-sizing: border-box;
  ul {
    .list {
      width: 100%;
      .keys {
        font-size: 40px;
        font-weight: 700;
        @include bg_color();
        // margin: 20px 0;
        color: white;
      }
      .singers {
        display: flex;
        align-items: center;
        font-size: 32px;
        margin: 20px;
        border-bottom: 1px solid #ccc;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
    }
  }
  .keyList {
    position: fixed;
    top: 230px;
    right: 20px;
    font-size: 35px;
    li {
      @include font-active-color();
      margin: 10px 0;
      text-align: center;
      &.active {
        text-shadow: 0 0 10px black;
      }
    }
  }
  .fix-title {
    position: fixed;
    top: 170px;
    left: 20px;
    right: 20px;
    font-size: 40px;
    color: white;
    font-weight: 700;
    @include bg_color();
  }
}
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
</style>
