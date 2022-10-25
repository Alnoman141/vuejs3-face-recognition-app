import * as bootstrap from "bootstrap";
import Vue from "vue";
if (process.client) {
  Vue.use(bootstrap);
}
