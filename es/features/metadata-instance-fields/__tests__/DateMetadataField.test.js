import React from 'react';
import { DateMetadataFieldBase as DateMetadataField } from '../DateMetadataField';
describe('features/metadata-instance-editor/fields/DateMetadataField', function () {
  var intl = {
    formatMessage: jest.fn()
  };
  test('should correctly render a date field', function () {
    var wrapper = shallow(React.createElement(DateMetadataField, {
      dataValue: "2018-06-13T00:00:00.000Z",
      intl: intl
    }));
    expect(wrapper).toMatchSnapshot();
  });
});