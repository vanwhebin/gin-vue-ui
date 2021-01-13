module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [ { 'files': ['*.vue'], 'rules': { 'indent': 'off' } } ],
  rules: {
    'space-before-function-paren': 0,
    "semi": ["error", "never"],
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    "comma-dangle": ["error", "never"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
