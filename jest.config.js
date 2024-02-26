module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|other-module-to-include)/)',
  ],
};
