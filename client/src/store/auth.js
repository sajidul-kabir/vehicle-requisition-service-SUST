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
    token(state) {
      return state.token;
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
    async signUp({ dispatch }, credentials) {
      let response = await axios.post(`${api}/users/signup`, credentials, {
        withCredentials: true,
      });

      console.log(response);
      return dispatch("attempt2", response.data);
      //console.log(response.data);
    },
    async attempt2({ commit }, data) {
      commit("SET_TOKEN", data.accessToken);
      if (data.role === "teacher") {
        commit("SET_USER", data.newTeacher.username);
      } else if (data.role === "transport") {
        commit("SET_USER", data.newTransport.username);
      } else {
        commit("SET_USER", data.newDriver.username);
      }
      commit("SET_ROLE", data.role);
    },

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
      const user = {
        username: data.username,
        role: data.role,
      };
      try {
        let response = await axios.post(`${api}/users/me`, user, {
          headers: { Authorization: `Bearer ${data.accessToken}` },
        });

        console.log(response, "RESPONSE");
        commit("SET_USER", data.username);
        commit("SET_ROLE", data.role);
      } catch (e) {
        commit("SET_USER", null);
        commit("SET_ROLE", null);
        console.log(e);
      }
    },
  },
};
