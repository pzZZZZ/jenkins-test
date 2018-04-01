import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        musicid: null
    },
    mutations: {
        changeid(state, id) {
            // 变更状态
            state.musicid = id
        }
    },
    actions: {
        changeid({ commit, state }, id) {
            commit('changeid', id)
        }
    }

})
export default store