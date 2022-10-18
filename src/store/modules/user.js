import { register, uploadImage } from "@/api/user";
export default {
  namespaced: true,
  state: {
    users: [],
    user: {
      id: "",
      name: "",
      images: [],
    },
  },

  mutations: {
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USER_ID: (state, user_id) => {
      state.user.id = user_id;
    },
    SET_USER_NAME: (state, user_name) => {
      state.user.name = user_name;
    },
    SET_USER_IMAGES: (state, image) => {
      state.user.images.unshift(image);
    },
    REMOVE_USER_IMAGES: (state, index) => {
      state.user.images.splice(index, 1);
    },
  },

  actions: {
    setUserData({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_USER_ID", data.id);
        commit("SET_USER_NAME", data.name);
        resolve({ message: "ok", status: 200 });
      });
    },
    setUserImage({ state, commit }, image) {
      return new Promise((resolve, reject) => {
        commit("SET_USER_IMAGES", image);
        resolve({ message: "mage set done", status: 200 });
      });
    },
    removeUserImage({ state, commit }, index) {
      return new Promise((resolve, reject) => {
        commit("REMOVE_USER_IMAGES", index);
        resolve({ message: "image remove done", status: 200 });
      });
    },
    register({state, commit}, data){
        return new Promise((resolve, reject) => {
            register(data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            }) 
        })
    },
    uploadImage({state, commit}, data) {
        return new Promise((resolve, reject) => {
            uploadImage(data).then(response => {
                resolve(resolve)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getUser({ state, commit }, data) {
      commit("SET_USER", data);
      console.log(state.user);
    },
  },

  getters: {},
};   