module.exports = {
  setupFiles: ["<rootDir>/__mocks__/localStorageMock.js"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  collectCoverageFrom: ["./**/*.{js,vue}"],
  coverageReporters: ["text", "json-summary"],
};
