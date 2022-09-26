import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONGS_DETAIL,
  SET_SONGS_LYRIC,
  SET_CURRENT_INDEX,
  SET_CUR_TIME,
  SET_FAV_LIST,
  GET_FAV_LIST,
  GET_HISTORY_LIST,
  SET_HISTORY_SONG,
} from "./mutations-type";
import { getSongDetail, getSongUrl, getSongLyric } from "@/api/index.js";
export default {
  setFullScreen({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag);
  },
  setMiniPlayer({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag);
  },
  setIsPlaying({ commit }, flag) {
    commit(SET_IS_PLAYING, flag);
  },
  setModeType({ commit }, flag) {
    commit(SET_MODE_TYPE, flag);
  },
  // 传过来的对象使用playload接收
  async setSongsDetail({ commit }, playload) {
    // 将获取到的id转换为字符串
    let id = playload.ids.join(",");
    let res = await getSongDetail(id);
    let urls = await getSongUrl(id);
    let list = [];
    res.data.songs.forEach((value, index, array) => {
      let obj = {};
      obj.id = value.id;
      obj.name = value.name;
      let singer = "";
      value["ar"].forEach((item, index) => {
        if (index === 0) {
          singer = item.name;
        } else {
          singer += " / " + item.name;
        }
      });
      obj.singer = singer;
      obj.picUrl = value.al.picUrl;
      for (let i = 0; i < urls.data.data.length; i++) {
        let item = urls.data.data[i];
        if (item.id == value.id) {
          obj.url = item.url;
          // padStart不足两位前面补零
          // let min = String(Math.floor(item.time / 1000 / 60)).padStart(2, 0);
          // let sec = String(Math.floor((item.time / 1000) % 60)).padStart(2, 0);
          // obj.time = min + ":" + sec;
        }
      }
      list.push(obj);
    });
    // 再将参数封装成对象传递给mutations
    commit(SET_SONGS_DETAIL, { list, index: playload.index });
  },
  async setSongsLyric({ commit }, id) {
    // 调用接口拉取数据
    let result = await getSongLyric(id);
    // 在未对setSongsLyric正确传值时result为空的,访问不到lyric属性
    let lrc = "";
    if (result.data.sgc) {
      lrc = "";
    } else {
      lrc = parseLyric(result.data.lrc.lyric);
    }
    commit(SET_SONGS_LYRIC, lrc);
  },
  setCurrentIndex({ commit }, index) {
    commit(SET_CURRENT_INDEX, index);
  },
  // 设置当前歌曲播放时间
  setCurTime({ commit }, time) {
    commit(SET_CUR_TIME, time);
  },
  setFavList({ commit }, song) {
    commit(SET_FAV_LIST, song);
  },
  getFavList({ commit }, list) {
    commit(GET_FAV_LIST, list);
  },
  setHistorySong({ commit }, song) {
    commit(SET_HISTORY_SONG, song);
  },
  getHistoryList({ commit }, list) {
    commit(GET_HISTORY_LIST, list);
  },
};

// 格式化歌词方法
function parseLyric(lrc) {
  let lyrics = lrc.split("\n");
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g;
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i;
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i;
  // 4.定义对象保存处理好的歌词
  let lyricObj = {};
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1);
    if (!timeStr) {
      return;
    }
    timeStr = timeStr[0];
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1);
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1);
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr);
    // 5.处理歌词
    let text = lyric.replace(reg1, "").trim();
    // 6.保存数据
    lyricObj[time] = text;
  });
  return lyricObj;
}
