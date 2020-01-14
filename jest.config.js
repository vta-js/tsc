module.exports = {
  preset: "ts-jest",
  testMatch: ["<rootDir>/__tests__/**/*.(js|ts)", "<rootDir>/**/*.(spec|test).(js|ts)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/(.+/)?__snapshots__/",
    "/__tests__/(.+/)?data/",
    "/__tests__/(.+/)?utils/",
  ],
  moduleNameMapper: {},
  collectCoverage: true,
  coveragePathIgnorePatterns: ["/node_modules/", "/__tests__/"],
};
