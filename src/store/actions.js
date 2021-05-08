/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios';
import { reject } from 'core-js/fn/promise';

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
      commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
      commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
      commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
      commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
      commit('UPDATE_USER_INFO', payload)
    },
    
    async fetchUsers({commit}) {
      const res = await axios.get('http://127.0.0.1:5000/api/users')
      commit('getUsers', res.data)
    },

    destroyToken({commit}){
      return new Promise((resolve, reject) => {

        if(this.state != null){
          try{
            localStorage.removeItem('access-token')
            commit('remToken')
            resolve()
          }
          catch (error){
            localStorage.removeItem('access-token')
            commit('remToken')
            reject(error)
          }
        }
      })
    },

    retrieveToken({commit},credentials) {
      return new Promise(async (resolve, reject) => {

        const res = await axios.post('http://127.0.0.1:5000/api/login', credentials)
        const token = res.data.token
        // console.log(res.data)
        try{
          localStorage.setItem('access-token', token)
          commit('getToken', token)
          resolve(res)
        }
        catch(error) {
          reject(error)
        }
      })
    },


}

export default actions
