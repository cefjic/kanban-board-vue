<template>
  <div id="app">
    <b-navbar variant="light">
      <b-navbar-brand href="#"><SomeIcon />{{ $t('appTitle') }}</b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-bind:text="$i18n.locale.toUpperCase()" right>
            <b-dropdown-item href="#" @click="changeLanguage('en')">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="changeLanguage('fr')">
              FR
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Board />
  </div>
</template>

<script>
import SomeIcon from './assets/logo.svg';
import Board from './components/Board';
import { i18n, messages } from './main';
import { LOCAL_STORAGE_LANGUAGE } from './utils';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'App',
  components: { SomeIcon, Board },
  methods: {
    changeLanguage(key) {
      localStorage.setItem(LOCAL_STORAGE_LANGUAGE, key);
      i18n.locale = Object.keys(messages).includes(key) ? key : 'fr';
    },
    updateTitle() {
      document.title = i18n.t('appTitle');
    }
  },
  validation: {
    name: {
      required,
      minLength: minLength(2)
    }
  },
  mounted() {
    this.updateTitle();
  },
  updated() {
    this.updateTitle();
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e3e3e3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

nav svg {
  width: 30px;
  height: 30px;
  vertical-align: top;
  margin-right: 12px;
}
</style>
