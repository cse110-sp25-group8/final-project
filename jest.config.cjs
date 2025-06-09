module.exports = {
  // emulate a browser-like environment
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
};
