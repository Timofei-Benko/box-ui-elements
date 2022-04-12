import React from 'react';
import { CustomMetadataFieldBase as CustomMetadataField } from '../CustomMetadataField';
describe('features/metadata-instance-editor/fields/CustomMetadataField', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  test('should correctly render a custom field when editable', function () {
    var wrapper = shallow(React.createElement(CustomMetadataField, {
      canEdit: true,
      dataValue: "value",
      intl: intl
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a custom field when not editable', function () {
    var wrapper = shallow(React.createElement(CustomMetadataField, {
      dataValue: "value",
      intl: intl
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a custom field is last', function () {
    var wrapper = shallow(React.createElement(CustomMetadataField, {
      dataValue: "value",
      intl: intl,
      isLast: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
});