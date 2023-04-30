module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/.storybook/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest",
  },
};
