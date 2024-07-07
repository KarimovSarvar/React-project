module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier', "react-compiler"],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    "react-compiler/react-compiler": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
