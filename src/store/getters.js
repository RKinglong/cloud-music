export default {
  // 是否显示播放界面
  isFullScreen(state) {
    return state.isFullScreen;
  },
  isMiniPlayer(state) {
    return state.isMiniPlayer;
  },
  isPlaying(state) {
    return state.isPlaying;
  },
  modeType(state) {
    return state.modeType;
  },
  songsDetail(state) {
    return state.songsDetail;
  },
  currentSong(state) {
    let obj = {
      name: "",
      picUrl: "",
      singer: "",
      id: 0,
    };
    if (state.songsDetail.length != 0) {
      return state.songsDetail[state.currentIndex];
    } else {
      return obj;
    }
  },
  // 获取歌词
  currentLyric(state) {
    return state.currentLyric;
  },
  // 获取歌曲下标
  currentIndex(state) {
    return state.currentIndex;
  },
  curTime(state) {
    return state.curTime;
  },
  favList(state) {
    return state.favList;
  },
  historyList(state) {
    return state.historyList;
  },
};
