import isDevEnvironment from '../env';
describe('util/env', function () {
  describe('isDevEnvironment()', function () {
    test('isDevEnvironment is true inside of unit tests', function () {
      expect(isDevEnvironment()).toBeTruthy();
    });
  });
});