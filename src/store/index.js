import { createStore } from 'vuex'
export default createStore({
    state(){
        return {
            userName:''
        }
    },
    mutations: {
        setUserName(state,payload){
            state.userName = payload
        }
    }
})