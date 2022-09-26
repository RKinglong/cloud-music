<template>
  <div class="rank">
    <div class="rank-warpper">
      <ScrollView>
        <ul>
          <li v-for="(item, index) in category.titles" :key="index">
            <h3 class="group-title">{{ item }}</h3>
            <ul v-if="item === '官方榜'" class="normal-group">
              <li
                v-for="(value, index) in category[index]"
                :key="index"
                @click.stop="selectItem(value.rank.id)"
              >
                <div class="rank-left">
                  <img :src="value.rank.coverImgUrl" alt="" />
                  <p>{{ value.rank.updateFrequency }}</p>
                </div>
                <div class="rank-right">
                  <p v-for="(song, index) in value.rank.tracks" :key="index">
                    {{ index + 1 }}.{{ song.first }}--{{ song.second }}
                  </p>
                </div>
              </li>
            </ul>
            <ul v-else class="other-group">
              <li
                v-for="(obj, index) in category[index]"
                :key="index"
                @click.stop="selectItem(obj.rank.id)"
              >
                <div class="rank-top">
                  <img :src="obj.rank.coverImgUrl" alt="" />
                  <p>{{ obj.rank.updateFrequency }}</p>
                </div>
                <div class="rank-bottom">
                  <p>{{ obj.rank.name }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from "@/api/index.js";
import ScrollView from "@/components/ScrollView.vue";
export default {
  name: "Rank",
  components: {
    ScrollView,
  },
  data() {
    return {
      category: {},
    };
  },
  created() {
    getTopListDetail().then((res) => {
      this.category = res;
    });
  },
  mounted() {},
  methods: {
    selectItem(id) {
      this.$router.push({ path: `/rank/detail/${id}/rank` });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variable";
@import "@/assets/css/mixin";
.rank {
  width: 100%;
  height: 100%;
  .rank-warpper {
    position: fixed;
    top: 160px;
    left: 20px;
    right: 20px;
    bottom: 120px;
    overflow: hidden;
    .group-title {
      font-size: 40px;
      font-weight: 700;
    }
    .normal-group {
      font-size: 32px;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .rank-left {
          img {
            width: 200px;
            border-radius: 20px;
          }
          p {
            color: #999;
          }
        }
        .rank-right {
          margin-left: 20px;
          p {
            padding: 10px 0;
          }
        }
      }
    }
    .other-group {
      font-size: 32px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin: 10px 0;
        .rank-top {
          position: relative;
          margin: 10px 0;
          img {
            width: 200px;
            border-radius: 20px;
          }
          p {
            position: absolute;
            left: 10px;
            bottom: 10px;
            color: #fff;
          }
        }
        .rank-bottom {
          width: 200px;
          @include clamp(1);
        }
      }
    }
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
