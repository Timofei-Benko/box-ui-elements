import React from 'react';
import sinon from 'sinon';
import Select from '..';
var sandbox = sinon.sandbox.create();
describe('components/select/Select', function () {
  afterEach(function () {
    sandbox.verifyAndRestore();
  });
  test('should correctly render label', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      name: "select"
    }));
    var label = wrapper.find('Label');
    expect(label.length).toBe(1);
    expect(label.prop('text')).toEqual('Album');
    expect(label.prop('hideLabel')).toBe(false);
  });
  test('should not render divs in labels for accessibility', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      name: "select"
    }));
    expect(wrapper.find('Label').find('div').length).toBe(0);
  });
  test('should hide label when showLabel prop is false', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      name: "select",
      showLabel: false
    }));
    expect(wrapper.find('Label').prop('hideLabel')).toBe(true);
  });
  test('should correctly render options in select', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      name: "select"
    }, React.createElement("option", null, "1"), React.createElement("option", null, "2"), React.createElement("option", null, "3")));
    expect(wrapper.find('option').length).toEqual(3);
  });
  test('should correctly render label tooltip when specified', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      labelTooltip: "This is my album.",
      name: "select"
    }));
    expect(wrapper.find('Label').prop('tooltip')).toEqual('This is my album.');
  });
  test('should correctly render custom attributes in select when specified', function () {
    var wrapper = shallow(React.createElement(Select, {
      "data-attr": "test",
      label: "Album",
      name: "select"
    }));
    expect(wrapper.find('select').prop('data-attr')).toEqual('test');
  });
  test('should call the onchange function when handler is specified', function () {
    var onChange = sinon.spy();
    var wrapper = shallow(React.createElement(Select, {
      label: "Album",
      name: "select",
      onChange: onChange
    }));
    wrapper.find('select').simulate('change');
    expect(onChange.calledOnce).toBe(true);
  });
  test('should render infoTooltip when specified', function () {
    var wrapper = shallow(React.createElement(Select, {
      infoIconProps: {
        title: 'hello'
      },
      infoTooltip: "hello!!!",
      label: "Album",
      name: "select"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should toggle infoTooltip when info icon is clicked', function () {
    var wrapper = shallow(React.createElement(Select, {
      infoIconProps: {
        title: 'hello'
      },
      infoTooltip: "hello!!!",
      label: "Album",
      name: "select"
    }));

    var getButton = function getButton() {
      return wrapper.find('PlainButton');
    };

    var getInfoTooltip = function getInfoTooltip() {
      return wrapper.find('Tooltip[text="hello!!!"]');
    };

    expect(getInfoTooltip().props().isShown).toBe(false); // Toggle on

    getButton().props().onClick();
    expect(getInfoTooltip().props().isShown).toBe(true); // Toggle off

    getButton().props().onClick();
    expect(getInfoTooltip().props().isShown).toBe(false);
  });
  test('should show Tooltip when error exists', function () {
    var wrapper = shallow(React.createElement(Select, {
      error: "error",
      label: "label"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not show Tooltip when no error exists', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "label"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should show error outline if specified', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "label",
      showErrorOutline: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not show error outline if not specified', function () {
    var wrapper = shallow(React.createElement(Select, {
      label: "label"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});