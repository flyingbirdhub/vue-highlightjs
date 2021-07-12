const esModules = ['lodash-es'].join('|');

module.exports = {
  modulePathIgnorePatterns: ['dist'],
  preset: 'ts-jest',
  testMatch: [
    '**/tests/**/*.spec.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  setupFilesAfterEnv: ['./tests/unit/__mocks__/worker.js'],
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts,vue}", "!node_modules/**", "!dist/**"],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    [`(${esModules}).+\\.js$`]: 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^web-worker:.+': 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules})`
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    },
  },
};
