function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            isAccessPolicy | isMaliciousContent | classification\n            ", "        | ", "            | ", "\n            ", "        | ", "           | ", "\n            ", "        | ", "            | ", "\n            ", "        | ", "           | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            isAccessPolicy | isMaliciousContent | componentLength\n            ", "        | ", "            | ", "\n            ", "       | ", "           | ", "\n            ", "       | ", "            | ", "\n            ", "        | ", "           | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            isAccessPolicy | isMaliciousContent | tooltipIsDisabled\n            ", "        | ", "            | ", "\n            ", "       | ", "           | ", "\n            ", "       | ", "            | ", "\n            ", "        | ", "           | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import sinon from 'sinon';
import AllowDownloadSection from '../AllowDownloadSection';
var sandbox = sinon.sandbox.create();
describe('features/shared-link-settings-modal/AllowDownloadSection', function () {
  var isDownloadAvailable = true;
  var canChangeDownload = true;
  var isDownloadEnabled = true;
  var directLink = 'box.com/download';
  var isDirectLinkAvailable = true;
  var isDirectLinkUnavailableDueToDownloadSettings = true;
  var isDirectLinkUnavailableDueToAccessPolicy = false;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(AllowDownloadSection, _extends({
      canChangeDownload: canChangeDownload,
      directLink: directLink,
      isDirectLinkAvailable: isDirectLinkAvailable,
      isDirectLinkUnavailableDueToDownloadSettings: isDirectLinkUnavailableDueToDownloadSettings,
      isDirectLinkUnavailableDueToAccessPolicy: isDirectLinkUnavailableDueToAccessPolicy,
      isDownloadAvailable: isDownloadAvailable,
      isDownloadEnabled: isDownloadEnabled,
      onChange: sandbox.stub()
    }, props)));
  };

  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  describe('isDownloadAvailable === true', function () {
    test('should render a Fieldset with Checkbox', function () {
      var wrapper = getWrapper({
        onChange: sandbox.mock()
      });
      expect(wrapper.find('Fieldset').length).toBe(1);
      var checkbox = wrapper.find('Checkbox');
      expect(checkbox.length).toBe(1);
      expect(checkbox.prop('isChecked')).toBe(true);
      checkbox.simulate('change');
    });
    test('should disable Checkbox when canChangeDownload is false', function () {
      var wrapper = getWrapper({
        canChangeDownload: false
      });
      expect(wrapper.find('Checkbox').prop('isDisabled')).toBe(true);
    });
    test('should render a TextInputWithCopyButton when direct link and download are enabled', function () {
      var wrapper = getWrapper();
      var textInput = wrapper.find('TextInputWithCopyButton');
      expect(textInput.length).toBe(1);
      expect(textInput.prop('value')).toEqual(directLink);
    });
    test('should pass passthrough props', function () {
      var wrapper = getWrapper({
        downloadCheckboxProps: {
          'data-prop': 'checkbox'
        },
        directLinkInputProps: {
          'data-prop': 'input'
        }
      });
      expect(wrapper.find('Checkbox').prop('data-prop')).toEqual('checkbox');
      expect(wrapper.find('TextInputWithCopyButton').prop('data-prop')).toEqual('input');
    });
    test('should not render a TextInputWithCopyButton when download is disabled', function () {
      var wrapper = getWrapper({
        isDownloadEnabled: false
      });
      expect(wrapper.find('TextInputWithCopyButton').length).toBe(0);
    });
    test.each(_templateObject(), true, true, false, false, false, true, false, true, false, true, false, false)('should have tooltip isDisabled set to $tooltipIsDisabled when isDirectLinkUnavailableDueToAccessPolicy is $isAccessPolicy, and isDirectLinkUnavailableDueToMaliciousContent is $isMaliciousContent', function (_ref) {
      var isAccessPolicy = _ref.isAccessPolicy,
          isMaliciousContent = _ref.isMaliciousContent,
          tooltipIsDisabled = _ref.tooltipIsDisabled;
      var wrapper = getWrapper({
        isDirectLinkUnavailableDueToAccessPolicy: isAccessPolicy,
        isDirectLinkUnavailableDueToMaliciousContent: isMaliciousContent
      });
      var tooltip = wrapper.find('Tooltip');
      expect(tooltip.prop('isDisabled')).toBe(tooltipIsDisabled);
    });
    test.each(_templateObject2(), true, true, 1, false, false, 0, false, true, 1, true, false, 1)('should have found className .bdl-is-disabled when isDirectLinkUnavailableDueToAccessPolicy is $isAccessPolicy, and isDirectLinkUnavailableDueToMaliciousContent is $isMaliciousContent', function (_ref2) {
      var isAccessPolicy = _ref2.isAccessPolicy,
          isMaliciousContent = _ref2.isMaliciousContent,
          componentLength = _ref2.componentLength;
      var wrapper = getWrapper({
        isDirectLinkUnavailableDueToAccessPolicy: isAccessPolicy,
        isDirectLinkUnavailableDueToMaliciousContent: isMaliciousContent
      });
      expect(wrapper.find('.bdl-is-disabled').length).toBe(componentLength);
    });
    test.each(_templateObject3(), true, true, undefined, true, false, undefined, true, true, 'foo', true, false, 'foo')('should render correct tooltip message when isDirectLinkUnavailableDueToAccessPolicy is $isAccessPolicy, isDirectLinkUnavailableDueToMaliciousContent is $isMaliciousContent and classification is set to $classification', function (_ref3) {
      var isAccessPolicy = _ref3.isAccessPolicy,
          isMaliciousContent = _ref3.isMaliciousContent,
          classification = _ref3.classification;
      var wrapper = getWrapper({
        isDirectLinkUnavailableDueToAccessPolicy: isAccessPolicy,
        isDirectLinkUnavailableDueToMaliciousContent: isMaliciousContent,
        classification: classification
      });
      expect(wrapper.find('Tooltip').prop('text')).toMatchSnapshot();
    });
  });
  describe('isDownloadAvailable === false', function () {
    test('should return null when direct link is not available', function () {
      var wrapper = getWrapper({
        isDownloadAvailable: false,
        isDirectLinkAvailable: false
      });
      expect(wrapper.type()).toBeNull();
    });
    test('should render a TextInputWithCopyButton when direct link is available', function () {
      var wrapper = getWrapper({
        isDownloadAvailable: false,
        isDirectLinkAvailable: true
      });
      expect(wrapper.find('TextInputWithCopyButton').length).toBe(1);
    });
  });
});