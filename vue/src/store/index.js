import {createStore} from "vuex";
import axiosClient from "../axios.js";

const tmpSurveys = [

];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
    surveys: [],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
  },
  getters: {},
  actions: {
    register({ commit }, userData) {
      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation
      };
      return axiosClient.post("/register", user)
        .then(({data}) => {
          commit("setUser", data)
          return data;
        });
    },
    login({ commit }, userData) {
      const user = {
        email: userData.email,
        password: userData.password,
        remember: userData.remember
      };
      return axiosClient.post("/login", user)
        .then(({data}) => {
          commit("setUser", data)
          return data;
        });
    },
    logout({commit}) {
      return axiosClient.post("/logout")
        .then(response => {
          commit("logout")
          return response;
        })
    }
  },
  mutations: {
    logout: state => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    }
  },
  modules: {}
});

export default store;
