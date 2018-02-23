const actions = {
    //异步操作需在actions中执行
    addCount(context){
        context.commit('increment')
    }
}
export default actions