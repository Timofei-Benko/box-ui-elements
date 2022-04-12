import React from 'react';
import TextArea from '../TextArea';
describe('components/text-area/TextArea', function () {
  test('should correctly render default component', function () {
    var component = shallow(React.createElement(TextArea, {
      label: "label",
      name: "name"
    }));
    expect(component.hasClass('text-area-container')).toBe(true);
  });
  test('should correctly render placeholder when defined', function () {
    var placeholder = 'a placeholder';
    var component = shallow(React.createElement(TextArea, {
      label: "label",
      name: "name",
      placeholder: placeholder
    }));
    expect(component.find('textarea').prop('placeholder')).toEqual(placeholder);
  });
  test('should correctly render value when defined', function () {
    var value = 'a value';
    var component = shallow(React.createElement(TextArea, {
      label: "label",
      name: "name",
      value: value
    }));
    expect(component.find('textarea').prop('value')).toEqual(value);
  });
  test('should correctly render label with hideLabel when hideLabel is passed', function () {
    var component = shallow(React.createElement(TextArea, {
      hideLabel: true,
      label: "hidden label",
      name: "name"
    }));
    expect(component.find('Label').prop('hideLabel')).toEqual(true);
  });
  test('should correctly render label when defined and required', function () {
    var label = 'a label';
    var component = shallow(React.createElement(TextArea, {
      isRequired: true,
      label: label,
      name: "name"
    }));
    expect(component.find('Label').prop('text')).toEqual(label);
  });
  test('should correctly render optional label when not required', function () {
    var label = 'a label';
    var component = shallow(React.createElement(TextArea, {
      label: label,
      name: "name"
    }));
    expect(component.find('Label').prop('showOptionalText')).toBe(true);
  });
  test('should correctly render name', function () {
    var name = 'a name';
    var component = shallow(React.createElement(TextArea, {
      label: "label",
      name: name
    }));
    expect(component.find('textarea').prop('name')).toEqual(name);
  });
  test('should show Tooltip when error exists', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      error: "error",
      label: "label"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('isShown')).toBe(true);
  });
  test('should not show Tooltip when no error exists', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label"
    }));
    var tooltip = wrapper.find('Tooltip');
    expect(tooltip.prop('isShown')).toBe(false);
  });
  test('should render Tooltip with tetherElementClassName', function () {
    var className = 'tether-element-class-name';
    var wrapper = shallow(React.createElement(TextArea, {
      error: "error",
      label: "label",
      tooltipTetherClassName: className
    }));
    var tetherEl = wrapper.find('Tooltip').dive().find('TetherComponent');
    expect(tetherEl.prop('className')).toBe(className);
  });
  test('should not show optional text when hideOptionalLabel is true', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label",
      hideOptionalLabel: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should show optional text when hideOptionalLabel is false', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should render text area with description', function () {
    var wrapper = shallow(React.createElement(TextArea, {
      label: "label",
      description: "some description"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});