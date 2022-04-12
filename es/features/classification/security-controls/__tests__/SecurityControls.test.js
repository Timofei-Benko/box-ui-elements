function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import SecurityControlsItem from '../SecurityControlsItem';
import SecurityControls from '../SecurityControls';
import { SECURITY_CONTROLS_FORMAT } from '../../constants';
import messages from '../messages';
var FULL = SECURITY_CONTROLS_FORMAT.FULL,
    SHORT = SECURITY_CONTROLS_FORMAT.SHORT,
    SHORT_WITH_BTN = SECURITY_CONTROLS_FORMAT.SHORT_WITH_BTN;
describe('features/classification/security-controls/SecurityControls', function () {
  var wrapper;
  var controls;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(SecurityControls, _extends({
      controls: controls,
      controlsFormat: SHORT,
      maxAppCount: 3
    }, props)));
  };

  beforeEach(function () {
    controls = {
      sharedLink: {
        accessLevel: 'collabOnly'
      },
      download: {
        desktop: {
          restrictManagedUsers: 'ownersCoOwners'
        }
      },
      externalCollab: {
        accessLevel: 'whitelist'
      },
      app: {
        accessLevel: 'whitelist',
        apps: [{
          displayText: 'App 1'
        }, {
          displayText: 'App 2'
        }]
      }
    };
    wrapper = getWrapper();
  });
  test('should render null when access policy does not contain controls', function () {
    wrapper.setProps({
      controls: {}
    });
    expect(wrapper.isEmptyRender()).toBe(true);
  });
  test('should render SecurityControls with single SecurityControlsItem when using SHORT controlsFormat', function () {
    wrapper.setProps({
      controlsFormat: SHORT
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render SecurityControls with single SecurityControlsItem and modal items when using SHORT_WITH_BTN controlsFormat and item, classification data is provided', function () {
    wrapper.setProps({
      controlsFormat: SHORT_WITH_BTN,
      classificationName: 'internal only',
      definition: 'classification definition',
      itemName: 'welcome.pdf'
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render SecurityControls multiple SecurityControlsItem when using FULL controlsFormat', function () {
    wrapper.setProps({
      controlsFormat: FULL
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render label for security controls when shouldRenderLabel prop is set', function () {
    wrapper.setProps({
      controlsFormat: SHORT
    });
    expect(wrapper.find('Label').length).toBe(0);
    wrapper.setProps({
      controlsFormat: SHORT,
      shouldRenderLabel: true
    });
    expect(wrapper.find('Label').length).toBe(1);
  });
  test('should restrict displayed app names to maxAppCount', function () {
    controls.app.apps = [{
      displayText: 'App 1'
    }, {
      displayText: 'App 2'
    }, {
      displayText: 'App 3'
    }, {
      displayText: 'App 4'
    }];
    wrapper.setProps({
      controlsFormat: FULL,
      controls: controls,
      maxAppCount: 2
    });
    expect(wrapper.find(SecurityControlsItem).findWhere(function (item) {
      return item.props().message.id === 'boxui.securityControls.appDownloadWhitelistOverflow';
    }).props().message.values).toEqual({
      appNames: 'App 1, App 2',
      remainingAppCount: 2
    });
  });
  test('should pass tooltipMessage to SecurityControlsItem if exceeds maxAppCount', function () {
    controls.app.apps = [{
      displayText: 'App 1'
    }, {
      displayText: 'App 2'
    }, {
      displayText: 'App 3'
    }];
    wrapper.setProps({
      controlsFormat: FULL,
      controls: controls,
      maxAppCount: 2
    });
    expect(wrapper.find(SecurityControlsItem).findWhere(function (item) {
      return item.props().message.id === 'boxui.securityControls.appDownloadWhitelistOverflow';
    }).props().tooltipMessage).toEqual(_objectSpread({}, messages.allAppNames, {
      values: {
        appsList: 'App 1, App 2, App 3'
      }
    }));
  });
});