import modeType from "./modeType";
export default {
  // 播放页面是否展示
  isFullScreen: false,
  // mini播放器是否展示
  isMiniPlayer: true,
  // 播放或暂停
  isPlaying: false,
  // 播放状态
  modeType: modeType.loop,
  // 歌曲详情
  songsDetail: [],
  // 当前歌曲索引，默认第一首
  currentIndex: 0,
  // 歌曲信息
  currentSong: {},
  // 当前歌词
  currentLyric: {},
  // 歌曲当前时间
  curTime: 0,
  // 喜欢歌曲
  favList: [],
  // 历史播放歌曲
  historyList: [],
};
