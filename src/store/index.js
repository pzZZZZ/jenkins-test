import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import { state, getters } from './modules/index'
Vue.use(Vuex)
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})
export default store