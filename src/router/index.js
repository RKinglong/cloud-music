import Vue from "vue";
import VueRouter from "vue-router";
// @代表src文件夹
// import Recommend from "@/views/Recommend.vue";
// import Singer from "@/views/Singer.vue";
// import Rank from "@/views/Rank.vue";
// import Search from "@/views/Search.vue";
const Recommend = (resolve) =>
  import("@/views/Recommend.vue").then((module) => {
    resolve(module);
  });
const Singer = (resolve) =>
  import("@/views/Singer.vue").then((module) => {
    resolve(module);
  });
const Rank = (resolve) =>
  import("@/views/Rank.vue").then((module) => {
    resolve(module);
  });
const Search = (resolve) =>
  import("@/views/Search.vue").then((module) => {
    resolve(module);
  });
const Detail = (resolve) =>
  import("@/views/Detail.vue").then((module) => {
    resolve(module);
  });
const Player = (resolve) =>
  import("@/views/Player.vue").then((module) => {
    resolve(module);
  });
const User = (resolve) =>
  import("@/views/User.vue").then((module) => {
    resolve(module);
  });

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // 路径重定向
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    // component: () => import('../views/Recommend.vue')
    component: Recommend,
    children: [
      {
        // 二级路由前不要有/
        path: `detail/:id/:type`,
        component: Detail,
      },
    ],
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: `detail/:id/:type`,
        component: Detail,
      },
    ],
  },
  {
    path: "/rank",
    component: Rank,
    children: [
      {
        path: `detail/:id/:type`,
        component: Detail,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/player",
    component: Player,
  },
  {
    path: "/user",
    component: User,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
