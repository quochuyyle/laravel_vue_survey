import {createStore} from "vuex";
import axiosClient from "../axios.js";

const tmpSurveys = [];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN")
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      data: []
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
  },
  getters: {},
  actions: {
    getSurvey({commit}, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    getSurveys({commit}){
      commit("setSurveysLoading", true);
      return axiosClient.get("/survey")
        .then((res) => {
          commit("setSurveysLoading", false);
          commit("setSurveys", res.data)
          return res;
        });
    },
    register({commit}, userData) {
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
    login({commit}, userData) {
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
    },
    saveSurvey({commit}, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          })
      }
    },
    deleteSurvey({commit}, id) {
      return axiosClient.delete(`/survey/${id}`);
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
    },
    saveSurvey: (state, survey) => {
      state.surveys = [...state.surveys, survey.data];
    },
    updateSurvey: (state, survey) => {
      state.surveys = state.surveys.map((s) => {
        if (s.id == survey.data.id) {
          return survey.data;
        }
        return s;
      })
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
    },

}
,
modules: {
}
})
;

export default store;
