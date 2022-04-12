function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        length                          | expected\n        ", "                          | ", "\n        ", " | ", "\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        action                             | date             | expected\n        ", " | ", " | ", "\n        ", " | ", " | ", "\n        ", " | ", "          | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { shallow } from 'enzyme';
import messages from '../messages';
import VersionsItemRetention from '../VersionsItemRetention';
import { VERSION_RETENTION_DELETE_ACTION, VERSION_RETENTION_REMOVE_ACTION, VERSION_RETENTION_INDEFINITE } from '../../../../constants';
describe('elements/content-sidebar/versions/VersionsItemRetention', function () {
  var defaultDate = new Date('2019-03-01T00:00:00');
  var dispositionAt = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000); // Future time

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsItemRetention, props));
  };

  test.each(_templateObject(), VERSION_RETENTION_DELETE_ACTION, dispositionAt, messages.versionRetentionDelete.id, VERSION_RETENTION_REMOVE_ACTION, dispositionAt, messages.versionRetentionRemove.id, VERSION_RETENTION_REMOVE_ACTION, null, messages.versionRetentionIndefinite.id)('should show the correct message given the disposition action $action', function (_ref) {
    var action = _ref.action,
        date = _ref.date,
        expected = _ref.expected;
    var wrapper = getWrapper({
      retention: {
        applied_at: defaultDate,
        disposition_at: date,
        winning_retention_policy: {
          disposition_action: action
        }
      }
    });
    expect(wrapper.find(FormattedMessage).prop('id')).toBe(expected);
  });
  test.each(_templateObject2(), '5', messages.versionRetentionDelete.id, VERSION_RETENTION_INDEFINITE, messages.versionRetentionIndefinite.id)('should show the correct message given the retention length $length', function (_ref2) {
    var length = _ref2.length,
        expected = _ref2.expected;
    var wrapper = getWrapper({
      retention: {
        applied_at: defaultDate,
        disposition_at: dispositionAt,
        winning_retention_policy: {
          disposition_action: VERSION_RETENTION_DELETE_ACTION,
          retention_length: length
        }
      }
    });
    expect(wrapper.find(FormattedMessage).prop('id')).toBe(expected);
  });
});