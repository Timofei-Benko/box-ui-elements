import React from 'react';
import MultiSelectMetadataField from '../MultiSelectMetadataField';
describe('features/metadata-instance-editor/fields/MultiSelectMetadataField', function () {
  test('should correctly render', function () {
    var wrapper = shallow(React.createElement(MultiSelectMetadataField, {
      dataValue: ['value']
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render with description', function () {
    var wrapper = shallow(React.createElement(MultiSelectMetadataField, {
      dataValue: ['value'],
      description: "description"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});