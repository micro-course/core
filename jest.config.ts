import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config = {
  // Add more setup options before each test is run
  projects: [
    {
      displayName: "client",
      testEnvironment: "jest-environment-jsdom",
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      modulePathIgnorePatterns: ["<rootDir>/tests/"],
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    },
    {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      displayName: "node",
      testMatch: ["<rootDir>/**/*.node-spec.ts"],
      testEnvironment: "node",
      preset: "ts-jest",
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
      },
      transformIgnorePatterns: ["node_modules/(?!(yaml))"],
    },
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
