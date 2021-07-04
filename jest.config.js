module.exports = {
  modulePathIgnorePatterns: ['dist'],
  testMatch: [
    '**/tests/**/*.spec.[jt]s?(x)',
    '**/__tests__/*.[jt]s?(x)'
  ],
  coverageReporters: ["json", "lcov", "text", "clover"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,ts,vue}", "!node_modules/**", "!dist/**"],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': "ts-jest",
  },
  moduleNameMapper: {
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'jsx',
    'json',
    'vue',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    },
  },
};
