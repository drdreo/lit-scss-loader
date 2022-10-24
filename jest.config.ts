import type { Config } from 'jest';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

const config: Config = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: 'node',
};

export default config;
