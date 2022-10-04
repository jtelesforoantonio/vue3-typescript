/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'block-spacing': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'lf',
        printWidth: 120,
        arrowParens: 'avoid',
      },
    ],
    'vue/multi-word-component-names': 'off',
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        selfClosingTag: 'never',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5
      }
    ],
  },
}
