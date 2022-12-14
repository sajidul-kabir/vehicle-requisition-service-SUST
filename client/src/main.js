import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCountdownTimer from "vuejs-countdown-timer";
import "./assets/tailwind.css";
import VueToast from "vue-toast-notification";
// Import one of the available themes
//import "vue-toast-notification/dist/theme-default.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);
Vue.use(VueCountdownTimer);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: (h) => h(App),
}).$mount("#app");
