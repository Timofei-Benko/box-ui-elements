import React from 'react';
import { shallow } from 'enzyme';
import VersionHistoryLink from '../../../features/item-details/VersionHistoryLink';
import SidebarVersions from '../SidebarVersions';
describe('elements/content-sidebar/SidebarVersions', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SidebarVersions, props));
  };

  test('should render the versions when version_number > 1', function () {
    var props = {
      file: {
        extension: 'foo',
        version_number: 2
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(VersionHistoryLink)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render the versions when version_number <= 1', function () {
    var props = {
      file: {
        extension: 'foo',
        version_number: 1
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(VersionHistoryLink).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render the versions when version_number is falsy', function () {
    var props = {
      file: {
        extension: 'foo',
        version: null
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(VersionHistoryLink).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render the versions when version_number is undefined', function () {
    var props = {
      file: {
        extension: 'foo'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(VersionHistoryLink).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render the versions when file is a box note', function () {
    var props = {
      file: {
        version_number: 1,
        extension: 'boxnote'
      }
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(VersionHistoryLink).exists()).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
});