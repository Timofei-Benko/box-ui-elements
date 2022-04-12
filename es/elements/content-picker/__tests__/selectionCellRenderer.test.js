import React from 'react';
import { shallow } from 'enzyme';
import selectionCellRenderer from '../selectionCellRenderer';
var rowData = {
  name: 'test',
  selected: true,
  type: 'file'
};
describe('selectionCellRenderer', function () {
  test.each([['Checkbox', false], ['RadioButton', true]])('should render %s if isRadio is %s', function (type, isRadio) {
    var Element = selectionCellRenderer(function () {}, 'file, web_link', [], false, isRadio);
    var wrapper = shallow(React.createElement(Element, {
      rowData: rowData
    }));
    expect(wrapper.exists(type)).toBe(true);
  });
  test.each([['isSelected', true], ['isChecked', false]])('should render %s if isRadio is %s', function (type, isRadio) {
    var Element = selectionCellRenderer(function () {}, 'file, web_link', [], false, isRadio);
    var wrapper = shallow(React.createElement(Element, {
      rowData: rowData
    }));
    expect(wrapper.prop(type)).toBe(true);
  });
});