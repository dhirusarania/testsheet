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

    getAllChapters({ commit, state }) {

        return new Promise((resolve, reject) => {

            axios({
                method: 'GET',
                url: state.api.apiSubject + this.$cookies.get('class') + "/" + this.$cookies.get('subject_id'),
                contentType: 'application/json',
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    commit('chapters', res.data)
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

    createChapters({ commit, state }, payload) {

        return new Promise((resolve, reject) => {

            axios({
                method: 'POST',
                url: state.api.apiSubject + this.$cookies.get('class') + "/" + this.$cookies.get('subject_id'),
                contentType: 'application/json',
                data: payload,
                headers: {
                    'Authorization': "Bearer " + this.$cookies.get('access_token')
                }
            })
                .then(res => {
                    commit('chapters', res.data)
                    resolve(res)
                })
                .catch((error) => {
                    console.log(error.response)
                    reject(error);
                })
        })
    },

}