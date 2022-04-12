function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            path                                 | sidebar\n            ", "                       | ", "\n            ", "              | ", "\n            ", "         | ", "\n            ", "                 | ", "\n            ", "            | ", "\n            ", " | ", "\n            ", "      | ", "\n            ", "              | ", "\n            ", "         | ", "\n            ", "                        | ", "\n            ", "               | ", "\n            ", "          | ", "\n            ", "                       | ", "\n            ", "                         | ", "\n            ", "                       | ", "\n            ", "                               | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { mount } from 'enzyme/build';
import { MemoryRouter } from 'react-router-dom';
import { SidebarPanelsComponent as SidebarPanels } from '../SidebarPanels'; // mock lazy imports

jest.mock('../SidebarUtils');
describe('elements/content-sidebar/SidebarPanels', function () {
  var getWrapper = function getWrapper() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$path = _ref.path,
        path = _ref$path === void 0 ? '/' : _ref$path,
        rest = _objectWithoutProperties(_ref, ["path"]);

    return mount(React.createElement(MemoryRouter, {
      initialEntries: [path],
      keyLength: 0
    }, React.createElement(SidebarPanels, _extends({
      file: {
        id: '1234'
      },
      hasActivity: true,
      hasDetails: true,
      hasMetadata: true,
      hasSkills: true,
      hasVersions: true,
      isOpen: true
    }, rest))));
  };

  describe('render', function () {
    test.each(_templateObject(), '/activity', 'ActivitySidebar', '/activity/comments', 'ActivitySidebar', '/activity/comments/1234', 'ActivitySidebar', '/activity/tasks', 'ActivitySidebar', '/activity/tasks/1234', 'ActivitySidebar', '/activity/annotations/1234/5678', 'ActivitySidebar', '/activity/annotations/1234', 'ActivitySidebar', '/activity/versions', 'VersionsSidebar', '/activity/versions/1234', 'VersionsSidebar', '/details', 'DetailsSidebar', '/details/versions', 'VersionsSidebar', '/details/versions/1234', 'VersionsSidebar', '/metadata', 'MetadataSidebar', '/skills', 'SkillsSidebar', '/nonsense', 'SkillsSidebar', '/', 'SkillsSidebar')('should render $sidebar given the path $path', function (_ref2) {
      var path = _ref2.path,
          sidebar = _ref2.sidebar;
      var wrapper = getWrapper({
        path: path
      });
      expect(wrapper.exists(sidebar)).toBe(true);
    });
    test('should render nothing if the sidebar is closed', function () {
      var wrapper = getWrapper({
        isOpen: false
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
    test('should render nothing if all sidebars are disabled', function () {
      var wrapper = getWrapper({
        hasActivity: false,
        hasDetails: false,
        hasMetadata: false,
        hasSkills: false,
        hasVersions: false
      });
      expect(wrapper.isEmptyRender()).toBe(true);
    });
    describe('activity sidebar', function () {
      test('should render with tasks deeplink', function () {
        var wrapper = getWrapper({
          path: '/activity/tasks/12345'
        });
        expect(wrapper.find('ActivitySidebar').props()).toMatchObject({
          activeFeedEntryType: 'task',
          activeFeedEntryId: '12345'
        });
      });
      test('should render with comments deeplink', function () {
        var wrapper = getWrapper({
          path: '/activity/comments/12345'
        });
        expect(wrapper.find('ActivitySidebar').props()).toMatchObject({
          activeFeedEntryType: 'comment',
          activeFeedEntryId: '12345'
        });
      });
      test('should render with versions deeplink', function () {
        var wrapper = getWrapper({
          path: '/activity/versions/12345'
        });
        expect(wrapper.find('VersionsSidebar').props()).toMatchObject({
          versionId: '12345'
        });
      });
      test('should render with annotations deeplink', function () {
        var wrapper = getWrapper({
          path: '/activity/annotations/12345/67890'
        });
        expect(wrapper.find('ActivitySidebar').props()).toMatchObject({
          activeFeedEntryType: 'annotation',
          activeFeedEntryId: '67890'
        });
      });
      test('should not pass down activeFeedEntry props with partial annotations deeplink', function () {
        var wrapper = getWrapper({
          path: '/activity/annotations/12345'
        });
        expect(wrapper.find('ActivitySidebar').props()).toMatchObject({
          activeFeedEntryType: undefined,
          activeFeedEntryId: undefined
        });
      });
    });
    describe('details sidebar', function () {
      test('should render with versions deeplink', function () {
        var wrapper = getWrapper({
          path: '/details/versions/12345'
        });
        expect(wrapper.find('VersionsSidebar').props()).toMatchObject({
          versionId: '12345'
        });
      });
    });
    describe('first loaded behavior', function () {
      test('should update isInitialized state on mount', function () {
        var wrapper = getWrapper({
          path: '/activity'
        });
        var sidebarPanels = wrapper.find(SidebarPanels);
        expect(sidebarPanels.state('isInitialized')).toBe(true);
      });
    });
  });
  describe('refresh()', function () {
    test.each([true, false])('should call the sidebars with the appropriate argument', function (shouldRefreshCache) {
      var instance = getWrapper().find(SidebarPanels).instance();
      ['activitySidebar', 'detailsSidebar', 'metadataSidebar', 'versionsSidebar'].forEach(function (sidebar) {
        instance[sidebar] = {
          current: {
            refresh: jest.fn()
          }
        };
      });
      instance.refresh(shouldRefreshCache);
      expect(instance.activitySidebar.current.refresh).toHaveBeenCalledWith(shouldRefreshCache);
      expect(instance.detailsSidebar.current.refresh).toHaveBeenCalledWith();
      expect(instance.metadataSidebar.current.refresh).toHaveBeenCalledWith();
      expect(instance.versionsSidebar.current.refresh).toHaveBeenCalledWith();
    });
  });
});