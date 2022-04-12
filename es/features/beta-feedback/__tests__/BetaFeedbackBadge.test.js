import React from 'react';
import BetaFeedbackBadge from '../BetaFeedbackBadge';
describe('features/beta-feedback/BetaFeedbackBadge', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      formUrl: 'http://example.org/'
    };
    return shallow(React.createElement(BetaFeedbackBadge, props));
  };

  test('should render default component', function () {
    var component = getWrapper();
    expect(component).toMatchSnapshot();
  });
  test('should render component with tooltip as requested', function () {
    var component = getWrapper({
      tooltip: true
    });
    expect(component).toMatchSnapshot();
  });
});