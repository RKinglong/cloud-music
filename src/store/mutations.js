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
  SET_HISTORY_SONG,
  GET_HISTORY_LIST,
} from "./mutations-type";
export default {
  [SET_FULL_SCREEN](state, flag) {
    state.isFullScreen = flag;
  },
  [SET_MINI_PLAYER](state, flag) {
    state.isMiniPlayer = flag;
  },
  [SET_IS_PLAYING](state, flag) {
    state.isPlaying = flag;
  },
  [SET_MODE_TYPE](state, flag) {
    state.modeType = flag;
  },
  [SET_SONGS_DETAIL](state, playload) {
    // 先赋值歌曲信息
    state.songsDetail = playload.list;
    // 再赋值下标
    // 如果先传递下标，歌曲里没有信息，会会报错
    state.currentIndex = playload.index;
  },
  [SET_SONGS_LYRIC](state, lyric) {
    state.currentLyric = lyric;
  },
  [SET_CURRENT_INDEX](state, index) {
    if (index < 0) {
      index = state.songsDetail.length - 1;
    } else if (index > state.songsDetail.length - 1) {
      index = 0;
    }
    state.currentIndex = index;
  },
  [SET_CUR_TIME](state, time) {
    state.curTime = time;
  },
  [SET_FAV_LIST](state, song) {
    // 返回数组中符合条件的第一个值，在数组中找到的话则不会往下执行。
    // 如果数组中没有符合条件的值则返回undefined
    let result = state.favList.find((item) => {
      return item.id === song.id;
    });
    if (result === undefined) {
      state.favList.push(song);
    }
  },
  [GET_FAV_LIST](state, list) {
    state.favList = list;
  },
  [SET_HISTORY_SONG](state, song) {
    let result = state.historyList.find((item) => {
      return item.id === song.id;
    });
    if (result === undefined) {
      // 超过30首删除最早加入的歌曲
      if (state.historyList.length > 30) {
        state.historyList.splice(0, 1);
        // state.historyList.shift()
      }
      state.historyList.push(song);
    }
  },
  [GET_HISTORY_LIST](state, list) {
    state.historyList = list;
  },
};
