import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

beforeAll(() => {
  //@ts-ignore
  global.__reanimatedWorkletInit = jest.fn();
});


jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  Reanimated.useSharedValue = jest.fn;
  Reanimated.useAnimatedStyle = jest.fn;
  return Reanimated;
});

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native-gesture-handler', () =>
  jest.requireActual('../node_modules/react-native-gesture-handler/jestSetup')
);