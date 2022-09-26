import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/base.scss";
import { Swipe, SwipeItem, Lazyload } from "vant";
// 引入iconfont
import "@/assets/iconfont/iconfont.css";

// 阻止显示生产模式的消息
Vue.config.productionTip = false;

Vue.use(Swipe).use(SwipeItem).use(Lazyload);

new Vue({
  router,
  store,
  // render会找到id="app",用模板里的代码将其替换掉
  render: (h) => h(App),
}).$mount("#app");
