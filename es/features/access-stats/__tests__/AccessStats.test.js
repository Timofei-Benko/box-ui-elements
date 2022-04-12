import React from 'react';
import AccessStats from '../AccessStats';
describe('features/access-stats/AccessStats', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AccessStats, props));
  };

  test('should render access stats properly with error message', function () {
    var wrapper = getWrapper({
      errorMessage: 'errorMessage'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats properly with open access stats modal handler', function () {
    var wrapper = getWrapper({
      openAccessStatsModal: function openAccessStatsModal() {},
      previewCount: 1
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats properly without error message', function () {
    var wrapper = getWrapper({
      previewCount: 1
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats header properly when total events are more than max events', function () {
    var wrapper = getWrapper({
      previewCount: 10000
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats properly when there are no events', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
  test('should render view more button with extra props', function () {
    var wrapper = getWrapper({
      viewMoreButtonProps: {
        hi: 1
      },
      openAccessStatsModal: function openAccessStatsModal() {}
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render access stats list with extra props', function () {
    var wrapper = getWrapper({
      previewStatButtonProps: {
        resin: 1
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});