import React from 'react';
import { EnumMetadataFieldBase as EnumMetadataField } from '../EnumMetadataField';
describe('features/metadata-instance-editor/fields/EnumMetadataField', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  test('should correctly render an enum field', function () {
    var wrapper = shallow(React.createElement(EnumMetadataField, {
      dataValue: "value",
      intl: intl,
      options: [{
        key: 'foo'
      }, {
        key: 'bar'
      }, {
        key: 'baz'
      }]
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render an enum field with description', function () {
    var wrapper = shallow(React.createElement(EnumMetadataField, {
      dataValue: "value",
      description: "description",
      intl: intl,
      options: [{
        key: 'foo'
      }, {
        key: 'bar'
      }, {
        key: 'baz'
      }]
    }));
    expect(wrapper).toMatchSnapshot();
  });
});