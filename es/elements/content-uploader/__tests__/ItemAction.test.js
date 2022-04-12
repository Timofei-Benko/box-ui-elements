function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        status\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        status\n        ", "\n        ", "\n        ", "\n        ", "\n        ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import { ItemActionForTesting as ItemAction } from '../ItemAction';
import { ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED, STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_COMPLETE, STATUS_STAGED, STATUS_ERROR } from '../../../constants';
describe('elements/content-uploader/ItemAction', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(ItemAction, _extends({
      intl: {
        formatMessage: function formatMessage(data) {
          return React.createElement("span", data);
        }
      },
      onClick: noop,
      status: STATUS_PENDING
    }, props)));
  };

  test.each(_templateObject(), STATUS_COMPLETE, STATUS_IN_PROGRESS, STATUS_STAGED, STATUS_ERROR, STATUS_PENDING)('should render correctly with $status', function (_ref) {
    var status = _ref.status;
    var wrapper = shallow(React.createElement(ItemAction, {
      intl: {
        formatMessage: function formatMessage(data) {
          return React.createElement("span", data);
        }
      },
      onClick: noop,
      status: status
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test.each(_templateObject2(), STATUS_COMPLETE, STATUS_IN_PROGRESS, STATUS_STAGED, STATUS_ERROR, STATUS_PENDING)('should render correctly with $status and resumable uploads enabled', function (_ref2) {
    var status = _ref2.status;
    var wrapper = shallow(React.createElement(ItemAction, {
      intl: {
        formatMessage: function formatMessage(data) {
          return React.createElement("span", data);
        }
      },
      onClick: noop,
      status: status,
      isResumableUploadsEnabled: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly with STATUS_ERROR and item is folder', function () {
    var wrapper = getWrapper({
      status: STATUS_ERROR,
      isFolder: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render PrimaryButton with STATUS_ERROR and upload file size exceeded', function () {
    var wrapper = getWrapper({
      status: STATUS_ERROR,
      error: {
        code: ERROR_CODE_UPLOAD_FILE_SIZE_LIMIT_EXCEEDED
      },
      onUpgradeCTAClick: function onUpgradeCTAClick() {}
    });
    expect(wrapper.exists('PrimaryButton')).toBe(true);
    expect(wrapper.exists('PlainButton')).toBe(false);
  });
});