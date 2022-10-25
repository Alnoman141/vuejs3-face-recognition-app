export default {
  namespaced: true,
  state: {
    users: [],
    user: {
      id: '',
      name: '',
      images: []
    }
  },

  mutations: {
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_USER_ID: (state, userId) => {
      state.user.id = userId
    },
    SET_USER_NAME: (state, userName) => {
      state.user.name = userName
    },
    SET_USER_IMAGES: (state, image) => {
      state.user.images.unshift(image)
    },
    REMOVE_USER_IMAGES: (state, index) => {
      state.user.images.splice(index, 1)
    }
  },

  actions: {
    setUserData ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_ID', data.id)
        commit('SET_USER_NAME', data.name)
        resolve({ message: 'ok', status: 200 })
      })
    },
    setUserImage ({ state, commit }, image) {
      return new Promise((resolve, reject) => {
        commit('SET_USER_IMAGES', image)
        resolve({ message: 'image set done', status: 200 })
      })
    },
    removeUserImage ({ state, commit }, index) {
      return new Promise((resolve, reject) => {
        commit('REMOVE_USER_IMAGES', index)
        resolve({ message: 'image remove done', status: 200 })
      })
    },
    register ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        this.$axios.$post('/api/user/register', data)
        commit('SET_USER_ID', data.id)
        commit('SET_USER_NAME', data.name)
        resolve({ message: 'User created', status: 200 })
      })
    },
    uploadImage ({ state, commit }, upload) {
      return new Promise((resolve, reject) => {
        this.$axios.$post('/api/user/uploadBase64', { upload })
        resolve({ message: 'image upload done', status: 200 })
      })
    },
    getUser ({ state, commit }, data) {
      commit('SET_USER', data)
      console.log(state.user)
    }
  },

  getters: {}
}
