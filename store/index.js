// import Vuex from 'vuex';
// import Vue from 'vue';

// Vue.use(Vuex);


// const createStore = () => {
//     return new Vuex.Store({
//         state: {
//             registrations: [],
//             users : 0
//         },
//         getters:{

//             getCurrentUser(state){
//                 return state.users
//             }
//         },
//         mutations:{
//             saveCurrentLoggedInUser(state, exercise){
//                 console.log('selecting exercise mutation, ' + exercise)
//                 state.users = exercise
//               }
//         },
//         actions:{
//             saveCurrentLoggedInUser(context, exercise){
//                 console.log('selecting exercise action, ' + exercise)
//                 context.commit('saveCurrentLoggedInUser', exercise);
//               }
//         }
//     });
//   };

//   export default createStore


import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const state = () => ({


    //global var
    name: "",
    isLoggedIn: 0,
    allSubjects: [],
    chapters: [],
    allQuestions: [],




})


export const mutations = {

    isLoggedIn(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn
    },

    allSubjects(state, allSubjects) {
        state.allSubjects = allSubjects
    },

    chapters(state, chapters) {
        state.chapters = chapters
    },
    allQuestions(state, allQuestions) {
        state.allQuestions = allQuestions
    },
}


export const getters = {

}



export const actions = {


    login({ commit, state }, payload) {

        return new Promise((resolve, reject) => {

            axios({
                    method: 'POST',
                    url: state.api.login,
                    data: payload,
                    contentType: 'application/json',
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    commit('allSubjects', res.data)
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    getAllSubjects({ commit, state }) {

        return new Promise((resolve, reject) => {

            axios({
                    method: 'GET',
                    url: state.api.getAllSubjects,
                    contentType: 'application/json',
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    commit('allSubjects', res.data.List)
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    getAllQuestions({ commit, state }) {
        commit('allQuestions', [])

        return new Promise((resolve, reject) => {

            axios({
                    method: 'GET',
                    url: state.api.allQuestions + this.$cookies.get('chapter_id') + "?limit=10&offset=0",
                    contentType: 'application/json',
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    if ("List" in res.data) {
                        commit('allQuestions', res.data.List)
                        resolve(res)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    getAllChapters({ commit, state }) {
        commit('chapters', [])

        return new Promise((resolve, reject) => {

            axios({
                    method: 'GET',
                    url: state.api.apiSubject + this.$cookies.get('subject_id') + "/" + this.$cookies.get('class'),
                    contentType: 'application/json',
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    if ("List" in res.data) {
                        commit('chapters', res.data.List)
                        resolve(res)
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    createChapters({ commit, state }, payload) {

        return new Promise((resolve, reject) => {

            console.log(payload)

            axios({
                    method: 'POST',
                    url: state.api.apiSubject + this.$cookies.get('subject_id') + "/" + this.$cookies.get('class'),
                    contentType: 'application/json',
                    data: payload,
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    createQuestion({ commit, state }, payload) {

        return new Promise((resolve, reject) => {

            console.log(payload)

            axios({
                    method: 'POST',
                    url: state.api.allQuestions + this.$cookies.get('chapter_id'),
                    contentType: 'application/json',
                    data: payload,
                    headers: {
                        'Authorization': "Bearer " + this.$cookies.get('access_token')
                    }
                })
                .then(res => {
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

}