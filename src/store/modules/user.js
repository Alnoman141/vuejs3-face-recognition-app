export default {
    namespaced: true,
    state: {
        user: {}
    },

    mutations: {
        SET_USER: (state, user) => {
            state.user = user;
        }
    },

    actions: {
        getUser({ state, commit }, data){
            commit('SET_USER', data);
            console.log(state.user);
        }
    },

    getters: {

    },

}   