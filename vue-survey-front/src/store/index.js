import { createStore } from "vuex";
import { getToken } from "@/utils/cookie";

export default createStore({
  state: {
    token: getToken() || "",
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    SET_TOKEN({ commit }, token) {
      commit("SET_TOKEN", token);
    },
  },
  modules: {},
});
