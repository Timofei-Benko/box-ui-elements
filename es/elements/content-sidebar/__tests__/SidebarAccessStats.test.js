function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import AccessStats from '../../../features/access-stats/AccessStats';
import ErrorMask from '../../../components/error-mask/ErrorMask';
import SidebarAccessStats, { SidebarAccessStatsComponent } from '../SidebarAccessStats';
describe('elements/content-sidebar/SidebarAccessStats', function () {
  var intl = {
    formatMessage: jest.fn()
  };

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SidebarAccessStatsComponent, _extends({
      intl: intl
    }, props)));
  };

  test('should render the component when access stats are zero (newly uploaded file)', function () {
    var props = {
      accessStats: {
        preview_count: 0,
        comment_count: 0,
        download_count: 0,
        edit_count: 0
      },
      file: {
        extension: 'foo'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(AccessStats)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render the component when there are no access stats', function () {
    var props = {
      accessStats: {
        preview_count: undefined,
        comment_count: undefined,
        download_count: undefined,
        edit_count: undefined
      },
      file: {
        extension: 'foo'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(AccessStats)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render the component if there is an error', function () {
    var props = {
      accessStats: {
        preview_count: 1,
        comment_count: 0,
        download_count: 0,
        edit_count: 0
      },
      error: 'foo',
      file: {
        extension: 'foo'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(AccessStats)).toHaveLength(1);
  });
  test('should render the component when there is at least one type of access stat', function () {
    var props = {
      accessStats: {
        preview_count: 1,
        comment_count: 0,
        download_count: 0,
        edit_count: 0
      },
      file: {
        extension: 'foo'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(AccessStats)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render an error', function () {
    var props = {
      maskError: {
        errorHeader: {
          id: 'foo',
          description: 'bar',
          defaultMessage: 'baz'
        }
      }
    };
    var wrapper = shallow(React.createElement(SidebarAccessStats, props));
    expect(wrapper.find(ErrorMask)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});