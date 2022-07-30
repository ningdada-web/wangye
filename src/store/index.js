import Vue from "vue";
import Vuex from "vuex";
import tab from "../store/tab";
import token from "./token"
import mine from "./mine"

Vue.use(Vuex);

const store = new Vuex.Store({
  // 保存状态的对象.通过$store.state.name来使用
  modules: {
    tab,
    token,
    mine
    // host,
  },
});

export default store;
