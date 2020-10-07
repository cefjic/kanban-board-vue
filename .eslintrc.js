module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6
  },
  env: {
    node: true,
    browser: true,
    jest: true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier/vue'
  ],
  rules: {
    semi: 'off',
    'space-before-function-paren': 'off',
    'vue/no-mutating-props': 'off'
  }
};
