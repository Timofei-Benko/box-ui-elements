import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import AdditionalTabPlaceholder from '../additional-tabs/AdditionalTabPlaceholder';
import AdditionalTabs from '../additional-tabs';
import AdditionalTabsLoading from '../additional-tabs/AdditionalTabsLoading';
import FeatureProvider from '../../common/feature-checking/FeatureProvider';
import IconChatRound from '../../../icons/general/IconChatRound';
import IconDocInfo from '../../../icons/general/IconDocInfo';
import IconMagicWand from '../../../icons/general/IconMagicWand';
import IconMetadataThick from '../../../icons/general/IconMetadataThick';
import SidebarNav from '../SidebarNav';
import SidebarNavButton from '../SidebarNavButton';
import SidebarNavSign from '../SidebarNavSign';
describe('elements/content-sidebar/SidebarNav', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var features = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return mount(React.createElement(MemoryRouter, {
      initialEntries: ["/".concat(active)]
    }, React.createElement(FeatureProvider, {
      features: features
    }, React.createElement(SidebarNav, props)))).find('SidebarNav').at(1);
  };

  test('should render skills tab', function () {
    var props = {
      hasSkills: true
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(IconMagicWand)).toHaveLength(1);
    expect(wrapper.find(IconMetadataThick)).toHaveLength(0);
    expect(wrapper.find(IconDocInfo)).toHaveLength(0);
    expect(wrapper.find(IconChatRound)).toHaveLength(0);
  });
  test('should render details tab', function () {
    var props = {
      hasDetails: true
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(IconMagicWand)).toHaveLength(0);
    expect(wrapper.find(IconMetadataThick)).toHaveLength(0);
    expect(wrapper.find(IconDocInfo)).toHaveLength(1);
    expect(wrapper.find(IconChatRound)).toHaveLength(0);
  });
  test('should render activity tab', function () {
    var props = {
      hasActivity: true
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(IconMagicWand)).toHaveLength(0);
    expect(wrapper.find(IconMetadataThick)).toHaveLength(0);
    expect(wrapper.find(IconDocInfo)).toHaveLength(0);
    expect(wrapper.find(IconChatRound)).toHaveLength(1);
  });
  test('should render metadata tab', function () {
    var props = {
      hasMetadata: true
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(IconMagicWand)).toHaveLength(0);
    expect(wrapper.find(IconMetadataThick)).toHaveLength(1);
    expect(wrapper.find(IconDocInfo)).toHaveLength(0);
    expect(wrapper.find(IconChatRound)).toHaveLength(0);
  });
  test('should have multiple tabs', function () {
    var props = {
      hasActivity: true,
      hasMetadata: true,
      hasSkills: true
    };
    var wrapper = getWrapper(props, 'activity');
    expect(wrapper.find(IconMagicWand)).toHaveLength(1);
    expect(wrapper.find(IconMetadataThick)).toHaveLength(1);
    expect(wrapper.find(IconDocInfo)).toHaveLength(0);
    expect(wrapper.find(IconChatRound)).toHaveLength(1);
    expect(wrapper.find(SidebarNavButton)).toHaveLength(3);
  });
  test('should render the additional tabs loading state', function () {
    var props = {
      additionalTabs: [],
      hasAdditionalTabs: true
    };
    var wrapper = getWrapper(props);
    expect(wrapper.find(AdditionalTabs)).toHaveLength(1);
    expect(wrapper.find(AdditionalTabsLoading)).toHaveLength(1);
    expect(wrapper.find(AdditionalTabPlaceholder)).toHaveLength(5);
  });
  test('should render the Box Sign entry point if its feature is enabled', function () {
    var features = {
      boxSign: {
        enabled: true,
        onClick: function onClick() {}
      }
    };
    var wrapper = getWrapper({}, 'activity', features);
    expect(wrapper.exists(SidebarNavSign)).toBe(true);
  });
  test('should not render the Box Sign entry point if its feature is not enabled', function () {
    var wrapper = getWrapper();
    expect(wrapper.exists(SidebarNavSign)).toBe(false);
  });
});