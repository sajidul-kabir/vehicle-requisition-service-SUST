import axios from "axios";
import api from "@/api";
export default {
  namespaced: true,
  state: {
    username: null,
    token: null,
    role: null,
  },
  getters: {
    authenticated(state) {
      if (state.token && state.username) {
        return true;
      } else {
        return false;
      }
    },
    user(state) {
      return state.username;
    },
    role(state) {
      return state.role;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      console.log(token);
      state.token = token;
    },
    SET_USER(state, data) {
      state.username = data;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      let response = await axios.post(`${api}/users/login`, credentials, {
        withCredentials: true,
      });
      console.log(response);
      return dispatch("attempt", response.data);
      //console.log(response.data);
    },
    async attempt({ commit }, data) {
      commit("SET_TOKEN", data.accessToken);
      commit("SET_USER", data.username);
      commit("SET_ROLE", data.role);
    },
  },
};