

const state = {
    count: 0
}
const getters = {
    getCount(state, getters) {
        return state.count
    }
}
export { state, getters }