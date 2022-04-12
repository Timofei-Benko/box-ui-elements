function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../messages';
import VersionsGroup from '../VersionsGroup';
import VersionsMenu from '../VersionsMenu';
jest.unmock('react-intl');
describe('elements/content-sidebar/versions/VersionsMenu', function () {
  var defaultDate = '2019-06-20T20:00:00.000Z';
  var defaultDateMs = new Date(defaultDate).valueOf();
  var defaultVersion = {
    id: '12345',
    action: 'upload',
    created_at: new Date(defaultDate),
    modified_at: new Date(defaultDate),
    modified_by: {
      name: 'Test User',
      id: '098765'
    }
  };

  var getVersion = function getVersion() {
    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _objectSpread({}, defaultVersion, {}, overrides);
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsMenu, props), {
      wrappingComponent: function wrappingComponent(wrapperProps) {
        return React.createElement(IntlProvider, _extends({
          locale: "en",
          messages: messages
        }, wrapperProps));
      }
    }).shallow() // <Memo .../>
    .dive();
  }; // <ul .../>


  var GlobalDate = Date;
  beforeEach(function () {
    global.Date = jest.fn(function (date) {
      return new GlobalDate(date || defaultDate);
    });

    global.Date.now = function () {
      return defaultDateMs;
    };
  });
  afterEach(function () {
    global.Date = GlobalDate;
  });
  describe('render', function () {
    test('should render version groups based on their created_at date', function () {
      var versions = [getVersion({
        created_at: '2019-06-20T20:00:00.000Z',
        id: '10'
      }), getVersion({
        created_at: '2019-06-20T18:00:00.000Z',
        id: '9'
      }), getVersion({
        created_at: '2019-06-19T20:00:00.000Z',
        id: '8'
      }), getVersion({
        created_at: '2019-06-18T20:00:00.000Z',
        id: '7'
      }), getVersion({
        created_at: '2019-06-17T20:00:00.000Z',
        id: '6'
      }), getVersion({
        created_at: '2019-06-16T20:00:00.000Z',
        id: '5'
      }), getVersion({
        created_at: '2019-06-01T20:00:00.000Z',
        id: '4'
      }), getVersion({
        created_at: '2019-05-30T20:00:00.000Z',
        id: '3'
      }), getVersion({
        created_at: '2019-02-01T20:00:00.000Z',
        id: '2'
      }), getVersion({
        created_at: '2018-05-01T20:00:00.000Z',
        id: '1'
      })];
      var wrapper = getWrapper({
        versions: versions
      });
      var groups = wrapper.find(VersionsGroup);
      expect(groups.length).toBe(9);
      expect(groups.at(0).prop('versions').length).toBe(2); // Multiple versions collapse into a group

      expect(groups.at(0).prop('heading')).toBe('Today');
      expect(groups.at(1).prop('heading')).toBe('Yesterday');
      expect(groups.at(2).prop('heading')).toBe('Tuesday');
      expect(groups.at(3).prop('heading')).toBe('Monday');
      expect(groups.at(4).prop('heading')).toBe('Last Week');
      expect(groups.at(5).prop('heading')).toBe('This Month');
      expect(groups.at(6).prop('heading')).toBe('May');
      expect(groups.at(7).prop('heading')).toBe('February');
      expect(groups.at(8).prop('heading')).toBe('2018');
    });
  });
});