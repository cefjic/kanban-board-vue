import { mount as utilsMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import FRENCH from '../locales/fr/common.json';
import VueI18n from 'vue-i18n';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuelidate);
localVue.use(VueI18n);
localVue.use(BootstrapVueIcons);

export const i18n = new VueI18n({
  locale: 'fr',
  messages: {
    fr: FRENCH
  }
});

const mount = (component, options) =>
  utilsMount(component, {
    ...options,
    localVue,
    i18n
  });

export default mount;
