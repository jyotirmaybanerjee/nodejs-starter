module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript
    testEnvironment: 'node', // Set the test environment to node
    collectCoverage: true, // Enable coverage collection
    coverageDirectory: './coverage', // Directory to output coverage reports
    coverageReporters: ['text', 'lcov'], // Specify the reporters for coverage
  };
  