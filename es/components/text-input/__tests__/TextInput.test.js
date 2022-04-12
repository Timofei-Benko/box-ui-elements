function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        isLoading | isValid  | icon                  | loadingIndicatorExists | validIconExists | customIconExists | description\n        ", "   | ", " | ", " | ", "                | ", "        | ", "         | ", "\n        ", "  | ", "  | ", " | ", "               | ", "         | ", "         | ", "\n        ", "  | ", " | ", " | ", "               | ", "        | ", "          | ", "\n        ", "   | ", " | ", "               | ", "                | ", "        | ", "         | ", "\n        ", "  | ", "  | ", "               | ", "               | ", "         | ", "         | ", "\n        ", "   | ", "  | ", "               | ", "               | ", "        | ", "         | ", "\n        ", "   | ", "  | ", " | ", "               | ", "        | ", "         | ", "\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import { shallow, mount } from 'enzyme';
import ClockBadge16 from '../../../icon/line/ClockBadge16';
import IconVerified from '../../../icons/general/IconVerified';
import LoadingIndicator from '../../loading-indicator';
import TextInput from '..';
jest.mock('lodash/uniqueId', function () {
  return function () {
    return 'description20';
  };
});
describe('components/text-input/TextInput', function () {
  test('should correctly render default component', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      label: "label",
      name: "input"
    }));
    expect(wrapper.hasClass('text-input-container')).toBeTruthy();
    expect(wrapper.find('Label').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('Tooltip').length).toEqual(1);
  });
  test('should correctly render placeholder when defined', function () {
    var placeholder = 'a placeholder';
    var wrapper = shallow(React.createElement(TextInput, {
      label: "label",
      name: "input",
      placeholder: placeholder
    }));
    expect(wrapper.find('input').prop('placeholder')).toEqual(placeholder);
  });
  test('should correctly render value when defined', function () {
    var value = 'a value';
    var wrapper = shallow(React.createElement(TextInput, {
      label: "label",
      name: "input",
      value: value
    }));
    expect(wrapper.find('input').prop('value')).toEqual(value);
  });
  test('should correctly render the label', function () {
    var label = 'a label';
    var wrapper = shallow(React.createElement(TextInput, {
      isRequired: true,
      label: label,
      name: "input"
    }));
    expect(wrapper.find('Label').prop('text')).toEqual(label);
  });
  test('should correctly render required optional if not required', function () {
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      name: "input"
    }));
    expect(wrapper.find('Label').prop('showOptionalText')).toBe(true);
  });
  test('should correctly render label tooltip when specified', function () {
    var labelTooltip = 'This is a label.';
    var wrapper = mount(React.createElement(TextInput, {
      label: "label",
      labelTooltip: labelTooltip,
      name: "input"
    }));
    expect(wrapper.find('Label').prop('tooltip')).toEqual(labelTooltip);
  });
  test('should hide optional label text when specified', function () {
    var wrapper = mount(React.createElement(TextInput, {
      hideOptionalLabel: true,
      label: "label",
      name: "input"
    }));
    expect(wrapper.find('Label').prop('showOptionalText')).toBe(false);
  });
  test('should show Tooltip when error exists', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      error: "error",
      label: "label"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('isShown')).toBe(true);
  });
  test('should show Tooltip for an error at a custom position', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      error: "error",
      errorPosition: "bottom-center",
      label: "label"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('position')).toBe('bottom-center');
  });
  test('should not show Tooltip when no error exists', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      label: "label"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('isShown')).toBe(false);
  });
  test('should render Tooltip with tetherElementClassName', function () {
    var className = 'tether-element-class-name';
    var wrapper = shallow(React.createElement(TextInput, {
      error: "error",
      label: "label",
      tooltipTetherClassName: className
    }));
    var tetherEl = wrapper.find('Tooltip').dive().find('TetherComponent');
    expect(tetherEl.prop('className')).toBe(className);
  });
  test('should render text input with description', function () {
    var wrapper = shallow(React.createElement(TextInput, {
      description: "some description"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test.each(_templateObject(), true, false, React.createElement(ClockBadge16, null), true, false, false, 'LoadingIndicator if a custom icon is provided but isLoading is true', false, true, React.createElement(ClockBadge16, null), false, true, false, 'IconVerified if a custom icon is provided but isValid is true', false, false, React.createElement(ClockBadge16, null), false, false, true, 'custom icon if provided and neither isLoading nor isValid is true', true, false, null, true, false, false, 'LoadingIndicator if isLoading is true', false, true, null, false, true, false, 'IconVerified if isValid is true', true, true, null, false, false, false, 'no icons if both isLoading and isValid are true', true, true, React.createElement(ClockBadge16, null), false, false, false, 'no icons if both isLoading and isValid are true and a custom icon is provided')('should render $description', function (_ref) {
    var isLoading = _ref.isLoading,
        isValid = _ref.isValid,
        icon = _ref.icon,
        loadingIndicatorExists = _ref.loadingIndicatorExists,
        validIconExists = _ref.validIconExists,
        customIconExists = _ref.customIconExists;
    var wrapper = shallow(React.createElement(TextInput, {
      icon: icon,
      isLoading: isLoading,
      isValid: isValid
    }));

    if (icon) {
      expect(wrapper.exists(ClockBadge16)).toBe(customIconExists);
    }

    expect(wrapper.exists(LoadingIndicator)).toBe(loadingIndicatorExists);
    expect(wrapper.exists(IconVerified)).toBe(validIconExists);
  });
});