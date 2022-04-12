import React from 'react';
import { mount } from 'enzyme';
import LabelPill, { LabelPillStatus } from '..';
describe('components/label-pill/LabelPill', function () {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var FormattedMessage = function FormattedMessage(msgObject) {
    return React.createElement("span", null, msgObject.defaultMessage);
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


  var MockIcon = function MockIcon(props) {
    return React.createElement("svg", props, React.createElement("g", null));
  };

  test('should render default DOM with message', function () {
    var fullComponent = mount(React.createElement(LabelPill.Pill, null, React.createElement(LabelPill.Text, null, React.createElement(FormattedMessage, {
      id: 'id.test',
      defaultMessage: 'test message',
      description: 'test message description'
    }))));
    expect(fullComponent).toMatchSnapshot();
  });
  test('should render default DOM with icon component', function () {
    var fullComponent = mount(React.createElement(LabelPill.Pill, null, React.createElement(LabelPill.Icon, {
      Component: MockIcon
    })));
    expect(fullComponent).toMatchSnapshot();
  });
  test('should include DOM for tooltip if specified', function () {
    var fullComponent = mount(React.createElement(LabelPill.Pill, null, React.createElement(LabelPill.Text, null, React.createElement(FormattedMessage, {
      id: 'id.test',
      defaultMessage: 'test message',
      description: 'test message description'
    }))));
    expect(fullComponent).toMatchSnapshot();
  });
  test('should spread props on the proper DOM element', function () {
    var expectedText = 'Sample ARIA text';
    var labelType = 'warning';
    var componentWithAria = mount(React.createElement(LabelPill.Pill, {
      "aria-label": expectedText,
      type: LabelPillStatus.WARNING
    }, React.createElement(LabelPill.Text, null, React.createElement(FormattedMessage, {
      id: 'id.test',
      defaultMessage: 'test message',
      description: 'test message description'
    }))));
    expect(componentWithAria.find('.bdl-LabelPill').prop('aria-label')).toBe(expectedText);
    expect(componentWithAria.find(".bdl-LabelPill--".concat(labelType))).toHaveLength(1);
  });
});