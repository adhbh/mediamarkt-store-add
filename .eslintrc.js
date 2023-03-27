module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'prettier',
  ],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
  },
};
