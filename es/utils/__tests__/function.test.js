import sinon from 'sinon';
import { retryNumOfTimes } from '../function';
var sandbox = sinon.sandbox.create();
describe('util/function', function () {
  var clock = sandbox.useFakeTimers();
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('retryNumOfTimes()', function () {
    test('should create a promise that resolves when the wrapped promise resolves', function () {
      var inner = sandbox.mock();
      var promise = retryNumOfTimes(function (resolve) {
        inner();
        resolve();
      }, 2);
      clock.tick(10);
      return promise.then(sandbox.mock());
    });
    test('should create a promise that resolves when the wrapped promise resolves on the second try', function () {
      var times = 0;
      var inner = sandbox.mock().twice();
      var promise = retryNumOfTimes(function (resolve, reject) {
        times += 1;
        inner();

        if (times === 2) {
          resolve();
        } else {
          reject();
        }
      }, 2);
      clock.tick(10);
      return promise.then(sandbox.mock());
    });
    test('should create a promise that rejects when the wrapped promise fails after the second try', function () {
      var inner = sandbox.spy();
      var promise = retryNumOfTimes(function (resolve, reject) {
        inner();
        reject(); // Always rejects
      }, 2);
      setTimeout(function () {
        promise.catch(sandbox.mock());
        expect(inner.callCount).to.equal(2);
      }, 100);
    });
    test('should create a promise that does not retry when the wrapped promise hardRejects', function () {
      var inner = sandbox.spy();
      var promise = retryNumOfTimes(function (resolve, reject, hardReject) {
        inner();
        hardReject();
      }, 2);
      setTimeout(function () {
        promise.catch(sandbox.mock());
        expect(inner.callCount).to.equal(1);
      }, 100);
    });
  });
});