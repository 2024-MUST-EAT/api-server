const config = {
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>'],
  verbose: true,
  // globalSetup: './globalSetup.ts',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  setupFilesAfterEnv: [],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        //the content you'd placed at "global"
        babel: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/**/(*.)test.(js|jsx|ts|tsx)',
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
};

module.exports = config;
