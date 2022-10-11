import { createApp } from 'vue'
import './style.css'
import * as bootstrap from "bootstrap";
import "./assets/scss/styles.scss";
import App from './App.vue'

import router from './router';
import store from './store';

createApp(App).use(router).use(store).mount('#app')
