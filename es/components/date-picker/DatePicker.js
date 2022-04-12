function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import noop from 'lodash/noop';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId'; // @ts-ignore flow import

import { RESIN_TAG_TARGET } from '../../common/variables';
import Alert16 from '../../icon/fill/Alert16';
import Calendar16 from '../../icon/fill/Calendar16';
import ClearBadge16 from '../../icon/fill/ClearBadge16';
import AccessiblePikaday from './AccessiblePikaday';
import { ButtonType } from '../button';
import Label from '../label';
import PlainButton from '../plain-button';
import Tooltip, { TooltipPosition, TooltipTheme } from '../tooltip'; // @ts-ignore flow import

import { convertDateToUnixMidnightTime } from '../../utils/datetime';
import './DatePicker.scss';
var messages = defineMessages({
  previousMonth: {
    "id": "boxui.base.previousMonth",
    "defaultMessage": "Previous Month"
  },
  nextMonth: {
    "id": "boxui.base.nextMonth",
    "defaultMessage": "Next Month"
  },
  iconAlertText: {
    "id": "boxui.datePicker.iconAlertText",
    "defaultMessage": "Invalid Date"
  },
  dateClearButton: {
    "id": "boxui.datePicker.dateClearButton",
    "defaultMessage": "Clear Date"
  },
  chooseDate: {
    "id": "boxui.datePicker.chooseDate",
    "defaultMessage": "Choose Date"
  },
  dateInputRangeError: {
    "id": "boxui.datePicker.dateInputRangeError",
    "defaultMessage": "Please enter a date between {minLocaleDate} and {maxLocaleDate}"
  },
  dateInputMaxError: {
    "id": "boxui.datePicker.dateInputMaxError",
    "defaultMessage": "Please enter a date before {maxLocaleDate}"
  },
  dateInputMinError: {
    "id": "boxui.datePicker.dateInputMinError",
    "defaultMessage": "Please enter a date after {minLocaleDate}"
  }
});
var TOGGLE_DELAY_MS = 300;
var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';
var TAB_KEY = 'Tab';
var ISO_DATE_FORMAT_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export var DateFormat;
/**
 * Converts date from being relative to GMT, to being relative to browser
 * timezone. E.g., Thu Jun 29 2017 00:00:00 GMT =>
 * Thu Jun 29 2017 00:00:00 GMT-0700 (PDT)
 * @param {Date} date UTC date
 * @returns {Date} date Local date
 */

(function (DateFormat) {
  DateFormat["ISO_STRING_DATE_FORMAT"] = "isoString";
  DateFormat["LOCALE_DATE_STRING_DATE_FORMAT"] = "localeDateString";
  DateFormat["UTC_TIME_DATE_FORMAT"] = "utcTime";
  DateFormat["UNIX_TIME_DATE_FORMAT"] = "unixTime";
  DateFormat["UTC_ISO_STRING_DATE_FORMAT"] = "utcISOString";
})(DateFormat || (DateFormat = {}));

function convertUTCToLocal(date) {
  var dateString = date.toUTCString(); // Remove ` GMT` from the timestamp string

  var dateStringWithoutTimeZone = dateString.slice(0, -4);
  return new Date(dateStringWithoutTimeZone);
}

function getFormattedDate(date, format) {
  if (!date) {
    return '';
  }

  var utcDate;

  switch (format) {
    case DateFormat.ISO_STRING_DATE_FORMAT:
      return date.toISOString();

    case DateFormat.LOCALE_DATE_STRING_DATE_FORMAT:
      return date.toLocaleDateString();

    case DateFormat.UTC_TIME_DATE_FORMAT:
      return convertDateToUnixMidnightTime(date);

    case DateFormat.UTC_ISO_STRING_DATE_FORMAT:
      utcDate = new Date(convertDateToUnixMidnightTime(date));
      return utcDate.toISOString();

    default:
      return date.getTime();
  }
}

var localesWhereWeekStartsOnSunday = ['en-US', 'en-CA', 'jp-JP'];

var DatePicker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DatePicker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isDateInputInvalid: false,
      showDateInputError: false
    });

    _defineProperty(_assertThisInitialized(_this), "errorMessageID", uniqueId('errorMessage'));

    _defineProperty(_assertThisInitialized(_this), "descriptionID", uniqueId('description'));

    _defineProperty(_assertThisInitialized(_this), "onSelectHandler", function () {
      var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          isAccessible = _this$props.isAccessible;
      var isDateInputInvalid = _this.state.isDateInputInvalid;

      if (onChange) {
        var formattedDate = _this.formatValue(date);

        onChange(date, formattedDate);
      }

      if (isAccessible) {
        if (_this.dateInputEl && _this.datePicker) {
          // Required because Pikaday instance is unbound
          // See https://github.com/Pikaday/Pikaday#usage
          _this.dateInputEl.value = _this.datePicker.toString();
        }

        if (_this.datePicker && _this.datePicker.isVisible()) {
          _this.datePicker.hide();

          _this.focusDatePicker();
        }
      }

      if (isDateInputInvalid) {
        _this.setState({
          isDateInputInvalid: false,
          showDateInputError: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "datePicker", null);

    _defineProperty(_assertThisInitialized(_this), "canUseDateInputType", true);

    _defineProperty(_assertThisInitialized(_this), "shouldStayClosed", false);

    _defineProperty(_assertThisInitialized(_this), "focusDatePicker", function () {
      // This also opens the date picker when isAccessible is disabled
      if (_this.dateInputEl) {
        _this.dateInputEl.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDateInputError", function () {
      var _this$props2 = _this.props,
          intl = _this$props2.intl,
          _this$props2$maxDate = _this$props2.maxDate,
          maxDate = _this$props2$maxDate === void 0 ? null : _this$props2$maxDate,
          _this$props2$minDate = _this$props2.minDate,
          minDate = _this$props2$minDate === void 0 ? null : _this$props2$minDate;
      var showDateInputError = _this.state.showDateInputError;
      var formatMessage = intl.formatMessage;
      if (!showDateInputError) return '';
      var dateInputError = '';
      var maxLocaleDate = getFormattedDate(maxDate, DateFormat.LOCALE_DATE_STRING_DATE_FORMAT);
      var minLocaleDate = getFormattedDate(minDate, DateFormat.LOCALE_DATE_STRING_DATE_FORMAT);

      if (maxLocaleDate && minLocaleDate) {
        dateInputError = formatMessage(messages.dateInputRangeError, {
          maxLocaleDate: maxLocaleDate,
          minLocaleDate: minLocaleDate
        });
      } else if (maxLocaleDate) {
        dateInputError = formatMessage(messages.dateInputMaxError, {
          maxLocaleDate: maxLocaleDate
        });
      } else if (minLocaleDate) {
        dateInputError = formatMessage(messages.dateInputMinError, {
          minLocaleDate: minLocaleDate
        });
      }

      return dateInputError;
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputKeyDown", function (event) {
      var _this$props3 = _this.props,
          isKeyboardInputAllowed = _this$props3.isKeyboardInputAllowed,
          isTextInputAllowed = _this$props3.isTextInputAllowed,
          isAccessible = _this$props3.isAccessible;

      if (!isKeyboardInputAllowed && _this.datePicker && _this.datePicker.isVisible()) {
        event.stopPropagation();
      } // Stops up/down arrow & spacebar from moving page scroll position since pikaday does not preventDefault correctly


      if (!(isTextInputAllowed || isAccessible) && event.key !== TAB_KEY) {
        event.preventDefault();
      }

      if ((isTextInputAllowed || isAccessible && !_this.canUseDateInputType) && event.key === ENTER_KEY) {
        event.preventDefault();
      } // Stops enter & spacebar from opening up the browser's default date picker


      if (isAccessible && (event.key === ENTER_KEY || event.key === ' ')) {
        event.preventDefault();
      }

      if (event.key === ENTER_KEY || event.key === ESCAPE_KEY || event.key === ' ') {
        // Since pikaday auto-selects when you move the select box, enter/space don't do anything but close the date picker
        if (_this.datePicker && _this.datePicker.isVisible()) {
          _this.datePicker.hide();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnChange", function (event) {
      var _this$props4 = _this.props,
          isAccessible = _this$props4.isAccessible,
          maxDate = _this$props4.maxDate,
          minDate = _this$props4.minDate,
          onChange = _this$props4.onChange;
      var isDateInputInvalid = _this.state.isDateInputInvalid;

      if (!isAccessible || !_this.canUseDateInputType) {
        return;
      }

      if (_this.datePicker && _this.datePicker.isVisible()) {
        event.stopPropagation();
      }

      var value = event.target.value;

      if (_this.datePicker && value) {
        var parsedDate = _this.parseDisplayDateType(value);

        if (parsedDate) {
          if (minDate && parsedDate < minDate || maxDate && parsedDate > maxDate) {
            _this.datePicker.setDate(null);

            _this.setState({
              isDateInputInvalid: true
            });

            return;
          } // Reset the error styling on valid date input


          if (isDateInputInvalid) {
            _this.setState({
              isDateInputInvalid: false,
              showDateInputError: false
            });
          }
        } else {
          _this.setState({
            isDateInputInvalid: true
          });
        } // Set date so Pikaday date picker value stays in sync with input


        _this.datePicker.setDate(parsedDate, true);

        if (onChange) {
          var formattedDate = _this.formatValue(parsedDate);

          onChange(parsedDate, formattedDate);
        }
      } else if (isDateInputInvalid) {
        _this.setState({
          isDateInputInvalid: false,
          showDateInputError: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function (event) {
      var _this$props5 = _this.props,
          isAccessible = _this$props5.isAccessible,
          isTextInputAllowed = _this$props5.isTextInputAllowed,
          onBlur = _this$props5.onBlur;
      var isDateInputInvalid = _this.state.isDateInputInvalid;
      var nextActiveElement = event.relatedTarget || document.activeElement; // This is mostly here to cancel out the pikaday hide() on blur

      if (_this.datePicker && _this.datePicker.isVisible() && nextActiveElement && nextActiveElement === _this.datePickerButtonEl) {
        _this.shouldStayClosed = true;
        setTimeout(function () {
          _this.shouldStayClosed = false;
        }, TOGGLE_DELAY_MS);
      }

      if (onBlur) {
        onBlur(event);
      } // Since we fire parent onChange event if isTextInputAllowed,
      // fire it on blur if the user typed a correct date format


      var inputDate = null;

      if (_this.dateInputEl) {
        var dateInputElVal = null;

        if (isAccessible && !_this.canUseDateInputType) {
          dateInputElVal = _this.parseDisplayDateType(_this.dateInputEl.value);
        }

        inputDate = new Date(dateInputElVal || _this.dateInputEl.value);
      }

      if ((isTextInputAllowed || isAccessible && !_this.canUseDateInputType) && inputDate && inputDate.getDate()) {
        _this.onSelectHandler(inputDate);
      }

      if (isAccessible && isDateInputInvalid) _this.setState({
        showDateInputError: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleButtonClick", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var _this$props6 = _this.props,
          isAccessible = _this$props6.isAccessible,
          isDisabled = _this$props6.isDisabled;

      if (isAccessible) {
        if (isDisabled || !_this.datePicker) {
          return;
        }

        if (_this.datePicker.isVisible()) {
          _this.datePicker.hide();

          _this.focusDatePicker();
        } else {
          _this.datePicker.show();
        }

        return;
      }

      if (!_this.shouldStayClosed) {
        _this.focusDatePicker();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleOnClick", function (event) {
      var isAccessible = _this.props.isAccessible;

      if (isAccessible) {
        // Suppress Firefox default behavior: clicking on input type "date"
        // opens the browser date picker.
        event.preventDefault();
        event.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatDisplay", function (date) {
      var _this$props7 = _this.props,
          displayFormat = _this$props7.displayFormat,
          intl = _this$props7.intl;
      return date ? intl.formatDate(date, displayFormat) : '';
    });

    _defineProperty(_assertThisInitialized(_this), "formatDisplayDateType", function (date) {
      // Input type "date" only accepts the format YYYY-MM-DD
      return date ? getFormattedDate(date, DateFormat.UTC_ISO_STRING_DATE_FORMAT).slice(0, 10) : '';
    });

    _defineProperty(_assertThisInitialized(_this), "parseDisplayDateType", function (dateString) {
      if (dateString && ISO_DATE_FORMAT_PATTERN.test(dateString)) {
        // Calling new Date('YYYY-MM-DD') without 'T00:00:00' yields undesired results:
        // E.g. new Date('2017-06-01') => May 31 2017
        // E.g. new Date('2017-06-01T00:00:00') => June 01 2017
        // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#parameters
        return new Date("".concat(dateString, "T00:00:00"));
      }

      return null;
    });

    _defineProperty(_assertThisInitialized(_this), "formatValue", function (date) {
      var dateFormat = _this.props.dateFormat;
      return dateFormat ? getFormattedDate(date, dateFormat) : '';
    });

    _defineProperty(_assertThisInitialized(_this), "clearDate", function (event) {
      // Prevents the date picker from opening after clearing
      event.preventDefault();
      var isAccessible = _this.props.isAccessible;

      if (_this.datePicker) {
        _this.datePicker.setDate(null);
      }

      _this.onSelectHandler(null);

      if (isAccessible) {
        _this.focusDatePicker();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "shouldUseAccessibleFallback", function () {
      var test = document.createElement('input');

      try {
        test.type = 'date';
      } catch (e) {} // no-op
      // If date input falls back to text input, show the fallback


      return test.type === 'text';
    });

    _defineProperty(_assertThisInitialized(_this), "renderCalendarButton", function () {
      var _this$props8 = _this.props,
          intl = _this$props8.intl,
          isAccessible = _this$props8.isAccessible,
          isAlwaysVisible = _this$props8.isAlwaysVisible,
          isDisabled = _this$props8.isDisabled;
      var formatMessage = intl.formatMessage;

      if (isAlwaysVisible) {
        return null;
      } // De-emphasizing the Pikaday date picker because it does not meet accessibility standards
      // Screenreaders & navigating via keyboard will no longer pick up on this element


      var accessibleAttrs = isAccessible ? {
        'aria-hidden': true,
        tabIndex: -1
      } : {};
      return React.createElement(PlainButton, _extends({
        "aria-label": formatMessage(messages.chooseDate),
        className: "date-picker-open-btn",
        getDOMRef: function getDOMRef(ref) {
          _this.datePickerButtonEl = ref;
        },
        isDisabled: isDisabled,
        onClick: _this.handleButtonClick,
        type: ButtonType.BUTTON
      }, accessibleAttrs), React.createElement(Calendar16, null));
    });

    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props9 = this.props,
          customInput = _this$props9.customInput,
          dateFormat = _this$props9.dateFormat,
          intl = _this$props9.intl,
          isAccessible = _this$props9.isAccessible,
          isAlwaysVisible = _this$props9.isAlwaysVisible,
          isTextInputAllowed = _this$props9.isTextInputAllowed,
          maxDate = _this$props9.maxDate,
          minDate = _this$props9.minDate,
          onChange = _this$props9.onChange,
          value = _this$props9.value,
          yearRange = _this$props9.yearRange;
      var formatDate = intl.formatDate,
          formatMessage = intl.formatMessage;
      var nextMonth = messages.nextMonth,
          previousMonth = messages.previousMonth;
      var defaultValue = value;

      if (isAccessible && this.shouldUseAccessibleFallback()) {
        this.canUseDateInputType = false;
      } // When date format is utcTime, initial date needs to be converted from being relative to GMT to being
      // relative to browser timezone


      if (dateFormat === DateFormat.UTC_TIME_DATE_FORMAT && value) {
        defaultValue = convertUTCToLocal(value);

        if (onChange) {
          var formattedDate = this.formatValue(defaultValue);
          onChange(defaultValue, formattedDate);
        }
      } // Make sure the DST detection algorithm in browsers is up-to-date


      var year = new Date().getFullYear();
      var i18n = {
        previousMonth: formatMessage(previousMonth),
        nextMonth: formatMessage(nextMonth),
        months: range(12).map(function (month) {
          return formatDate(new Date(year, month, 15), {
            month: 'long'
          });
        }),
        // weekdays must start with Sunday, so array of dates below is May 1st-8th, 2016
        weekdays: range(1, 8).map(function (date) {
          return formatDate(new Date(2016, 4, date), {
            weekday: 'long'
          });
        }),
        weekdaysShort: range(1, 8).map(function (date) {
          return formatDate(new Date(2016, 4, date), {
            weekday: 'narrow'
          });
        })
      }; // If "bound" is true (default), the DatePicker will be appended at the end of the document, with absolute positioning
      // If "bound" is false, the DatePicker will be appended to the DOM right after the input, with relative positioning

      var datePickerConfig = {
        bound: !customInput,
        blurFieldOnSelect: false,
        // Available in pikaday > 1.5.1
        setDefaultDate: true,
        defaultDate: defaultValue === null ? undefined : defaultValue,
        field: this.dateInputEl,
        firstDay: localesWhereWeekStartsOnSunday.includes(intl.locale) ? 0 : 1,
        maxDate: maxDate,
        minDate: minDate,
        position: 'bottom left',
        i18n: i18n,
        showDaysInNextAndPreviousMonths: true,
        onSelect: this.onSelectHandler,
        yearRange: yearRange,
        toString: this.formatDisplay
      };

      if (isAccessible) {
        if (this.canUseDateInputType) {
          delete datePickerConfig.field;
          datePickerConfig.trigger = this.dateInputEl;
          datePickerConfig.accessibleFieldEl = this.dateInputEl;
          datePickerConfig.datePickerButtonEl = this.datePickerButtonEl;
        }

        datePickerConfig.parse = this.parseDisplayDateType;
        datePickerConfig.toString = this.formatDisplayDateType;
        datePickerConfig.keyboardInput = false;
      }

      this.datePicker = new AccessiblePikaday(datePickerConfig);

      if (isTextInputAllowed) {
        this.updateDateInputValue(this.formatDisplay(defaultValue));
      }

      if (isAlwaysVisible) {
        this.datePicker.show();
        this.datePicker.hide = noop;
      }
    } // eslint-disable-next-line camelcase

  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!this.datePicker) return;
      var _nextProps$value = nextProps.value,
          nextValue = _nextProps$value === void 0 ? null : _nextProps$value,
          _nextProps$minDate = nextProps.minDate,
          nextMinDate = _nextProps$minDate === void 0 ? null : _nextProps$minDate,
          _nextProps$maxDate = nextProps.maxDate,
          nextMaxDate = _nextProps$maxDate === void 0 ? null : _nextProps$maxDate;
      var _this$props10 = this.props,
          value = _this$props10.value,
          minDate = _this$props10.minDate,
          maxDate = _this$props10.maxDate,
          isTextInputAllowed = _this$props10.isTextInputAllowed;
      var selectedDate = this.datePicker && this.datePicker.getDate(); // only set date when props change

      if (nextValue && !value || !nextValue && value || nextValue && value && nextValue.getTime() !== value.getTime()) {
        this.datePicker.setDate(nextValue);
      } // If text input is allowed the dateInputEl will act as an uncontrolled input and
      // we need to set formatted value manually.


      if (isTextInputAllowed) {
        this.updateDateInputValue(this.formatDisplay(nextValue));
      }

      if (nextMinDate && !minDate || nextMinDate && minDate || nextMinDate && minDate && nextMinDate.getTime() !== minDate.getTime()) {
        this.datePicker.setMinDate(nextMinDate);

        if (selectedDate && selectedDate < nextMinDate) {
          this.datePicker.gotoDate(nextMinDate);
        }
      }

      if (nextMaxDate && !maxDate || !nextMaxDate && maxDate || nextMaxDate && maxDate && nextMaxDate.getTime() !== maxDate.getTime()) {
        this.datePicker.setMaxDate(nextMaxDate);

        if (selectedDate && nextMaxDate && selectedDate > nextMaxDate) {
          this.datePicker.gotoDate(nextMaxDate);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.datePicker) {
        this.datePicker.destroy();
      }
    }
  }, {
    key: "updateDateInputValue",
    value: function updateDateInputValue(value) {
      if (this.dateInputEl) {
        this.dateInputEl.value = value;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props11 = this.props,
          className = _this$props11.className,
          customInput = _this$props11.customInput,
          description = _this$props11.description,
          error = _this$props11.error,
          errorTooltipPosition = _this$props11.errorTooltipPosition,
          hideLabel = _this$props11.hideLabel,
          hideOptionalLabel = _this$props11.hideOptionalLabel,
          inputProps = _this$props11.inputProps,
          intl = _this$props11.intl,
          isAccessible = _this$props11.isAccessible,
          isClearable = _this$props11.isClearable,
          isDisabled = _this$props11.isDisabled,
          isRequired = _this$props11.isRequired,
          isTextInputAllowed = _this$props11.isTextInputAllowed,
          label = _this$props11.label,
          maxDate = _this$props11.maxDate,
          minDate = _this$props11.minDate,
          name = _this$props11.name,
          onFocus = _this$props11.onFocus,
          placeholder = _this$props11.placeholder,
          resinTarget = _this$props11.resinTarget,
          value = _this$props11.value;
      var isDateInputInvalid = this.state.isDateInputInvalid;
      var formatMessage = intl.formatMessage;
      var errorMessage = error || this.getDateInputError();
      var hasError = !!errorMessage || isDateInputInvalid;
      var hasValue = !!value || isDateInputInvalid;
      var classes = classNames(className, 'date-picker-wrapper', {
        'show-clear-btn': isClearable && hasValue && !isDisabled,
        'show-error': hasError
      });
      var ariaAttrs = {
        'aria-invalid': hasError,
        'aria-required': isRequired,
        'aria-errormessage': this.errorMessageID,
        'aria-describedby': description ? this.descriptionID : undefined
      };
      var resinTargetAttr = resinTarget ? _defineProperty({}, RESIN_TAG_TARGET, resinTarget) : {};
      var valueAttr;

      if (isAccessible) {
        valueAttr = {
          defaultValue: this.formatDisplayDateType(value)
        };
      } else if (isTextInputAllowed) {
        valueAttr = {
          defaultValue: this.formatDisplay(value)
        };
      } else {
        valueAttr = {
          value: this.formatDisplay(value)
        };
      }

      var onChangeAttr;

      if (isAccessible && this.canUseDateInputType) {
        onChangeAttr = {
          onChange: this.handleOnChange
        };
      } else if (isTextInputAllowed || isAccessible && !this.canUseDateInputType) {
        onChangeAttr = {};
      } else {
        // Fixes prop type error about read-only field
        // Not adding readOnly so constraint validation works
        onChangeAttr = {
          onChange: noop
        };
      }

      var additionalAttrs;

      if (isAccessible && this.canUseDateInputType) {
        additionalAttrs = {
          max: this.formatDisplayDateType(maxDate) || '9999-12-31',
          min: this.formatDisplayDateType(minDate) || '0001-01-01'
        };
      } else if (isAccessible && !this.canUseDateInputType) {
        // "name" prop is required for pattern validation to be surfaced on form submit. See components/form-elements/form/Form.js
        // "title" prop is shown during constraint validation as a description of the pattern
        // See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#usability
        additionalAttrs = {
          name: name,
          pattern: ISO_DATE_FORMAT_PATTERN.source,
          title: 'YYYY-MM-DD'
        };
      } else {
        additionalAttrs = {};
      }

      return React.createElement("div", {
        className: classes
      }, React.createElement("span", {
        className: "date-picker-icon-holder"
      }, React.createElement(Label, {
        hideLabel: hideLabel,
        showOptionalText: !hideOptionalLabel && !isRequired,
        text: label
      }, React.createElement(React.Fragment, null, !!description && React.createElement("div", {
        id: this.descriptionID,
        className: "date-picker-description"
      }, description), React.createElement(Tooltip, {
        className: "date-picker-error-tooltip",
        isShown: !!errorMessage,
        position: errorTooltipPosition,
        text: errorMessage || '',
        theme: TooltipTheme.ERROR
      }, customInput ? React.cloneElement(customInput, _objectSpread({
        disabled: isDisabled,
        ref: function ref(_ref2) {
          _this2.dateInputEl = _ref2;
        },
        required: isRequired
      }, resinTargetAttr, {}, ariaAttrs)) : React.createElement("input", _extends({
        ref: function ref(_ref3) {
          _this2.dateInputEl = _ref3;
        },
        className: "date-picker-input",
        disabled: isDisabled,
        onBlur: this.handleInputBlur,
        onClick: this.handleOnClick,
        placeholder: placeholder || formatMessage(messages.chooseDate),
        required: isRequired,
        type: isAccessible && this.canUseDateInputType ? 'date' : 'text'
      }, onChangeAttr, {
        onFocus: onFocus,
        onKeyDown: this.handleInputKeyDown
      }, resinTargetAttr, ariaAttrs, inputProps, valueAttr, additionalAttrs))), React.createElement("span", {
        id: this.errorMessageID,
        className: "accessibility-hidden",
        role: "alert"
      }, errorMessage))), isClearable && hasValue && !isDisabled ? React.createElement(PlainButton, {
        "aria-label": formatMessage(messages.dateClearButton),
        className: "date-picker-clear-btn",
        onClick: this.clearDate,
        type: ButtonType.BUTTON
      }, React.createElement(ClearBadge16, null)) : null, hasError ? React.createElement(Alert16, {
        className: "date-picker-icon-alert",
        title: React.createElement(FormattedMessage, messages.iconAlertText)
      }) : null, this.renderCalendarButton(), React.createElement("input", {
        className: "date-picker-unix-time-input",
        name: name,
        readOnly: true,
        type: "hidden",
        value: value ? this.formatValue(value) : ''
      })));
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "defaultProps", {
  className: '',
  dateFormat: DateFormat.UNIX_TIME_DATE_FORMAT,
  displayFormat: {},
  error: '',
  errorTooltipPosition: TooltipPosition.BOTTOM_LEFT,
  inputProps: {},
  isClearable: true,
  isKeyboardInputAllowed: false,
  isTextInputAllowed: false,
  yearRange: 10
});

export { DatePicker as DatePickerBase };
export default injectIntl(DatePicker);
//# sourceMappingURL=DatePicker.js.map