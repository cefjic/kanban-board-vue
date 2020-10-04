import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueI18n from "vue-i18n";
import FR_COMMON from "./locales/fr/common.json";
import EN_COMMON from "./locales/en/common.json";

Vue.config.productionTip = false;
Vue.use(BootstrapVueIcons);
Vue.use(BootstrapVue);
Vue.use(VueI18n);

export const messages = {
  fr: FR_COMMON,
  en: EN_COMMON,
};

export const i18n = new VueI18n({
  locale: "fr",
  messages,
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
