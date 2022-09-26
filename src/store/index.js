import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  // 拿到state中的数据
  getters,
  // 保存修改数据的全局方法
  mutations,
  // actions:用于保存触发mutations的方法
  actions,
  modules: {},
});
