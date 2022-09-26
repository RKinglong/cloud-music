<template>
  <div class="search">
    <div class="search-box">
      <span class="iconfont">&#xe8d6;</span>
      <input
        type="text"
        v-model="keywords"
        placeholder="搜索歌曲、歌手、专辑"
        v-throttle="search"
      />
    </div>
    <!-- 如果没有关键字，不显示搜索建议提示 -->
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li
            v-for="(item, index) in searchList"
            :key="index"
            @click="playMusic(index)"
          >
            <span class="iconfont">&#xe8d6;</span>
            <p>{{ item.name }}-{{ item.artists[0].name }}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li
          v-for="(item, index) in searchHots"
          :key="index"
          @click.stop="selectHot(item.first)"
        >
          {{ item.first }}
        </li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="(item, index) in searchHistory" :key="index">
        <span class="iconfont">&#xe74f;</span>
        <p>{{ item }}</p>
        <span class="iconfont" @click.stop="delHistory(item)">&#xe602;</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from "@/components/ScrollView.vue";
import { getSearchList, getSearchHot } from "@/api/index.js";
import { mapActions } from "vuex";
export default {
  name: "Search",
  components: {
    ScrollView,
  },
  data() {
    return {
      // 搜索关键字
      keywords: "",
      // 搜索列表
      searchList: [],
      // 热门搜索
      searchHots: [],
      // 搜索历史
      searchHistory: [],
    };
  },
  created() {
    getSearchHot().then((res) => {
      this.searchHots = res.data.result.hots;
    });

    // 初始化搜索历史数据
    let historyList = JSON.parse(window.localStorage.getItem("searchHistory"));
    if (historyList === undefined || historyList === null) {
      return;
    }
    this.searchHistory = historyList;
  },
  mounted() {},
  methods: {
    ...mapActions([
      "setFullScreen",
      "setIsPlaying",
      "setSongsDetail",
      "setMiniPlayer",
    ]),
    search() {
      getSearchList(this.keywords).then((res) => {
        // console.log(res);
        this.searchList = res.data.result.songs;
      });
    },
    playMusic(index) {
      // 播放音乐
      this.setFullScreen(true);
      this.setIsPlaying(true);
      this.setMiniPlayer(false);
      // 将参数封装成对象传递
      // ids必须是数组
      let id = this.searchList.map((item) => {
        return item.id;
      });
      this.setSongsDetail({ ids: id, index });

      // 将点击过的音乐，放入搜索历史
      this.searchHistory.push(this.keywords);
    },
    selectHot(name) {
      // console.log(name);
      this.keywords = name;
      this.search();
    },
    // 删除某个搜索历史
    delHistory(name) {
      // 将名字相同的过滤掉
      this.searchHistory = this.searchHistory.filter((item) => {
        return item !== name;
      });
      // 搜索历史有变化，需要重新存入到localStorage中，只能存字符串
      window.localStorage.setItem(
        "searchHistory",
        JSON.stringify(this.searchHistory)
      );
    },
  },
  // 函数防抖：在事件被触发n秒后在执行回调，如果在这n秒内又被触发，则重新计时
  // 函数节流：在单位时间（1s）内随便出发多少次，都只会执行一次
  // 自定义局部指令
  directives: {
    // 指令名称
    throttle: {
      // bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      // inserted：当被绑元素插入父节点时调用
      // el指定所绑定的元素
      inserted: function (el, obj) {
        // 定时器id
        let timeId = null;
        let flag = true;
        el.addEventListener("input", function () {
          if (!flag) return;
          flag = false;
          // 只有当一个语句满足才会执行第二个
          timeId && clearTimeout(timeId);
          // 启动定时器，返回定时器id
          timeId = setTimeout(() => {
            flag = true;
            // value为指令的绑定值
            obj.value();
          }, 1000);
        });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  .search-box {
    position: relative;
    font-size: 35px;
    margin: 20px 20px;
    .iconfont {
      position: absolute;
      left: 20px;
      top: 20px;
      font-size: 35px;
    }
    input[type="text"] {
      width: 100%;
      height: 80px;
      padding: 0 70px;
      border-radius: 40px;
      box-sizing: border-box;
      background-color: #ebecec;
      box-shadow: 1px 1px 10px 3px #ccc;
      border: none;
      outline: none;
    }
  }
  .search-suggest {
    position: fixed;
    top: 270px;
    left: 0;
    right: 0;
    bottom: 120px;
    overflow: hidden;
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      .iconfont {
        font-size: 35px;
        margin-right: 10px;
      }
      p {
        font-size: 35px;
      }
    }
  }
  .search-hot {
    margin: 0 30px;
    h3 {
      font-size: 35px;
      font-weight: 700;
    }
    ul {
      font-size: 32px;
      display: flex;
      flex-wrap: wrap;
      li {
        height: 40px;
        line-height: 40px;
        border: 1px solid red;
        padding: 10px;
        margin: 20px 30px 0 0;
        border-radius: 40px;
      }
    }
  }
  .search-history {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 20px;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .iconfont {
        font-size: 35px;
      }
      p {
        font-size: 35px;
        margin-left: -450px;
      }
    }
  }
}
</style>
