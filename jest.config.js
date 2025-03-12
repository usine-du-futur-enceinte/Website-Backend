export const preset = "ts-jest";
export const testEnvironment = "node";
export const collectCoverage = true;
export const coverageDirectory = "./coverage";
export const coverageReporters = ["text", "html"];
export const setupFilesAfterEnv = ["./tests/setup.ts"];
export const maxWorkers = 1;