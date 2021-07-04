module.exports = {
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  ignorePatterns: [
    '*.config.js',
    'dist',
    '.eslintrc.js'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default', format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'variableLike', format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable', format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike', format: ['camelCase'],
      },
      {
        selector: 'memberLike', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike', format: ['PascalCase'],
      },
      {
        selector: 'typeParameter', format: ['PascalCase'], prefix: ['T'],
      },
      {
        selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false },
      },
      {
        selector: 'objectLiteralProperty', format: ['camelCase', 'PascalCase'],
      }
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
