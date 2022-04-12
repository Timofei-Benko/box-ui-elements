function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import PropTypes from 'prop-types';
import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeTimeFormat from '@formatjs/intl-relativetimeformat';
export var FormattedDate = function FormattedDate() {
  return React.createElement("div", null);
};
FormattedDate.displayName = 'FormattedDate';
export var FormattedTime = function FormattedTime() {
  return React.createElement("div", null);
};
FormattedTime.displayName = 'FormattedTime';
export var FormattedRelativeTime = function FormattedRelativeTime() {
  return React.createElement("div", null);
};
FormattedRelativeTime.displayName = 'FormattedRelativeTime';
export var FormattedMessage = function FormattedMessage() {
  return React.createElement("div", null);
};
FormattedMessage.displayName = 'FormattedMessage';
export var FormattedNumber = function FormattedNumber() {
  return React.createElement("div", null);
};
FormattedNumber.displayName = 'FormattedNumber';
export var IntlProvider = function IntlProvider() {
  return React.createElement("div", null);
};
IntlProvider.displayName = 'IntlProvider';
export var defineMessages = function defineMessages(messages) {
  return messages;
};
export var intlShape = PropTypes.any;
export var createIntl = function createIntl(_ref) {
  var _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'en' : _ref$locale;
  return {
    formatMessage: function formatMessage(message, values) {
      var imf = new IntlMessageFormat(message.defaultMessage || message.message, locale);
      return imf.format(values);
    },
    formatDate: function formatDate(date) {
      return date;
    },
    formatRelativeTime: function formatRelativeTime(value) {
      var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'second';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // eslint-disable-next-line
      IntlRelativeTimeFormat.__addLocaleData( // eslint-disable-next-line
      require("@formatjs/intl-relativetimeformat/dist/locale-data/".concat(locale, ".json")));

      var rtf = new IntlRelativeTimeFormat(locale, options);
      return rtf.format(value, unit);
    }
  };
};
export var injectIntl = function injectIntl(Component) {
  var WrapperComponent = function WrapperComponent(props) {
    var injectedProps = _objectSpread({}, props, {
      intl: createIntl({
        locale: props.locale
      }) // eslint-disable-line react/prop-types

    });

    return React.createElement(Component, _objectSpread({}, injectedProps));
  };

  WrapperComponent.displayName = Component.displayName || Component.name || 'Component';
  return WrapperComponent;
};