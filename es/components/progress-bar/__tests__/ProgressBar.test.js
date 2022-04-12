import React from 'react';
import ProgressBar from '..';
describe('components/progress-bar/ProgressBar', function () {
  var renderComponent = function renderComponent() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(ProgressBar, props));
  };

  test('should render a progress bar with the input width', function () {
    var expected = {
      width: '20%'
    };
    var component = renderComponent({
      progress: 20
    });
    expect(component.find('.progress-bar').prop('style').width).toEqual(expected.width);
  });
  test('should render a progress bar with the input width and className', function () {
    var className = 'dis be a className';
    var expected = {
      className: className,
      width: '20%'
    };
    var component = renderComponent({
      className: className,
      progress: 20
    });
    expect(component.find('.progress-bar').prop('className').indexOf(expected.className) !== -1).toBeTruthy();
    expect(component.find('.progress-bar').prop('style').width).toEqual(expected.width);
  });
});