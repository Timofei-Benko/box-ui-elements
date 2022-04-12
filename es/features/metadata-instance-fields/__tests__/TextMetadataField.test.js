import React from 'react';
import { TextMetadataFieldBase as TextMetadataField } from '../TextMetadataField';
describe('features/metadata-instance-editor/fields/TextMetadataField', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  test('should correctly render a text field', function () {
    var wrapper = shallow(React.createElement(TextMetadataField, {
      dataValue: "value",
      intl: intl
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a number field', function () {
    var wrapper = shallow(React.createElement(TextMetadataField, {
      dataValue: "value",
      intl: intl,
      type: "number"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a zero in a number field', function () {
    var wrapper = shallow(React.createElement(TextMetadataField, {
      dataValue: 0,
      intl: intl,
      type: "number"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});