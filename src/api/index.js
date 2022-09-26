import axios from "axios";
import { request } from "./network.js";

//获取推荐歌单
export function getPersonalized() {
  return request({
    url: "/personalized?limit=6",
    method: "get",
  });
}
// 获取最新专辑
export function getNewAlbum() {
  return request({
    url: "/album/newest",
  });
}
// 获取轮播图
export function getBanner() {
  return request({
    url: "/banner?type=1",
  });
}
// 获取最新歌曲
export function getNewSong() {
  return request({
    url: "/personalized/newsong?limit=6",
  });
}
// 获取推荐歌单详情页面
export function getPersonalizedDetail(data) {
  return request({
    url: `/playlist/detail?id=${data}`,
  });
}

// 获取推荐专辑详情页面
export function getAlbumDetail(data) {
  return request({
    url: `/album?id=${data}`,
  });
}

// 获取歌曲详情
export function getSongDetail(data) {
  return request({
    url: `/song/detail?ids=${data}`,
  });
}

// 获取音乐url
export function getSongUrl(data) {
  return request({
    url: `/song/url?id=${data}`,
  });
}

// 获取歌词
export function getSongLyric(data) {
  return request({
    url: `/lyric?id=${data}`,
  });
}

// 搜索
export function getSearchList(data) {
  return request({
    url: `/search?keywords=${data}`,
  });
}

// 热门搜索
export function getSearchHot() {
  return request({
    url: `/search/hot`,
  });
}

// 获取热门歌手
export function getHotSinger() {
  return new Promise((resolve, reject) => {
    request({
      url: `/top/artists?offset=0&limit=5`,
    })
      .then((res) => {
        resolve(res.data.artists);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 获取歌手列表
export function getSingers(letter) {
  return new Promise((resolve, reject) => {
    let letterArtists = [];
    axios
      .all([
        request({
          method: "get",
          url: `/artist/list?type=-1&area=-1&initial=${letter}&limit=10`,
        }),
      ])
      .then(function (res) {
        res.forEach(function (item) {
          letterArtists.push(...item.data.artists);
        });
        resolve(letterArtists);
      })
      .catch((err) => {
        reject(err);
      });
  });

  // request({
  //   // initial传入歌手名字首字母或-1热门歌手
  //   url: `/artist/list?type=-1&area=-1&initial=${letter}&limit=10`,
  // });
}

// 并发请求
export function getAllSingers() {
  return new Promise((resolve, reject) => {
    // 右侧字母导航hot,a,b,...,z
    let keys = ["Hot"];
    // 每个字母对应的歌手
    let list = [getHotSinger()];
    for (let i = 65; i < 91; i++) {
      // 将ascii码转换成字符A-Z
      let char = String.fromCharCode(i);
      // 将字母加入右侧导航
      keys.push(char);
      // 将获取的歌手加入list数组
      list.push(getSingers(char));
    }
    axios
      .all(list)
      .then((result) => {
        let obj = {};
        obj.keys = keys;
        obj.list = result;
        resolve(obj);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 获取歌手详情
export function getSingerDetail(data) {
  return request({
    url: `/artist/detail?id=${data}`,
  });
}

export function getTopListDetail() {
  return new Promise((resolve, reject) => {
    let category = {
      officialList: [
        { name: "飙升榜", id: 3 },
        { name: "新歌榜", id: 0 },
        { name: "原创榜", id: 2 },
        { name: "热歌榜", id: 1 },
      ],
      recList: [
        { name: "云音乐说唱榜", id: 23 },
        { name: "云音乐电音榜", id: 25 },
        { name: "云音乐欧美新歌榜", id: 32 },
        { name: "UK排行榜周榜", id: 26 },
        { name: "云音乐ACG VOCALOID榜", id: 22 },
        { name: "云音乐民谣榜", id: 24 },
      ],
      globalList: [
        { name: "美国Billboard榜", id: 60198 },
        { name: "潜力爆款榜", id: 5 },
        { name: "Beatport全球电子舞曲榜", id: 21 },
        { name: "日本Oricon榜", id: 10 },
        { name: "网络热歌榜", id: 8 },
        { name: "云音乐日语榜", id: 29 },
      ],
      otherList: [
        { name: "KTV唛榜", id: 7 },
        { name: "法国 NRJ Vos Hits 周榜", id: 19 },
        { name: "云音乐古风榜", id: 27 },
        { name: "云音乐韩语榜", id: 28 },
        { name: "云音乐摇滚榜", id: 30 },
        { name: "云音乐欧美热歌榜", id: 31 },
      ],
      titles: {
        officialList: "官方榜",
        recList: "推荐榜",
        globalList: "全球榜",
        otherList: "更多榜单",
      },
    };
    request({
      method: "get",
      url: `/toplist/detail`,
    })
      .then((res) => {
        res.data.list.forEach(function (obj) {
          for (let k in category) {
            let flag = false;
            for (let i = 0; i < category[k].length; i++) {
              if (category[k][i].name === obj.name) {
                category[k][i].rank = obj;
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        });
        resolve(category);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 获取排行榜
export function getTopList(data) {
  return request({
    url: `/playlist/detail?id=${data}`,
  });
}
