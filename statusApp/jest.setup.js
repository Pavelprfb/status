/* eslint-env jest */
jest.mock('@react-native-async-storage/async-storage', () => {
  const store = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn(async key => (key in store ? store[key] : null)),
      setItem: jest.fn(async (key, value) => {
        store[key] = String(value);
      }),
      removeItem: jest.fn(async key => {
        delete store[key];
      }),
      clear: jest.fn(async () => {
        Object.keys(store).forEach(k => delete store[k]);
      }),
    },
  };
});
jest.mock('@react-native-clipboard/clipboard', () => ({
  __esModule: true,
  default: {
    setString: jest.fn(async () => {}),
    getString: jest.fn(async () => ''),
  },
}));
