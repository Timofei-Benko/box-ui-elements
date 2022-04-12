import React from 'react';
import ReadOnlyMetadataField from '../ReadOnlyMetadataField';
describe('features/metadata-instance-editor/fields/ReadOnlyMetadataField', function () {
  test('should correctly render a string field', function () {
    var wrapper = shallow(React.createElement(ReadOnlyMetadataField, {
      dataValue: "value"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render a date field', function () {
    var wrapper = shallow(React.createElement(ReadOnlyMetadataField, {
      dataValue: "2018-06-13T00:00:00.000Z",
      type: "date"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render with description', function () {
    var wrapper = shallow(React.createElement(ReadOnlyMetadataField, {
      dataValue: "value",
      description: "description"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render multi select field', function () {
    var wrapper = shallow(React.createElement(ReadOnlyMetadataField, {
      dataValue: ['value'],
      description: "description"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});