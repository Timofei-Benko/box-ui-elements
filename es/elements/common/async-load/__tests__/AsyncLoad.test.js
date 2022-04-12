import * as React from 'react';
import { shallow } from 'enzyme';
import { retryNumOfTimes } from '../../../../utils/function';
import AsyncLoad from '../AsyncLoad';
jest.mock('../../../../utils/function', function () {
  return {
    retryNumOfTimes: jest.fn()
  };
});
describe('elements/common/async-load/AsyncLoad', function () {
  var getAsyncComponent = function getAsyncComponent() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      loader: jest.fn()
    };
    return AsyncLoad(props);
  };

  var getWrapper = function getWrapper(AsyncComponent, props) {
    return shallow(React.createElement(AsyncComponent, props)).dive();
  };

  test('should load the lazy component', function () {
    var AsyncComponent = getAsyncComponent();
    var wrapper = getWrapper(AsyncComponent, {
      foo: 'bar'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should not invoke the loader until component mounted', function () {
    expect(retryNumOfTimes).not.toHaveBeenCalled();
  });
});