import { createStore } from 'vuex';

// Create a new store instance.
const store = createStore({
    modules: {
        user: user
    }
})

export default store;