export default {
  namespaced: true,
  state: {
    attendenceData: [],
    user: {}
  },

  mutations: {
    SET_ATTENDENCE_DATA: (state, attendenceData) => {
      state.attendenceData = attendenceData
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    save ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        this.$axios.$post('/api/attendence/save', data)
        resolve({ message: 'User attendence done', status: 200, data })
      })
    }
  },

  getters: {}
}
