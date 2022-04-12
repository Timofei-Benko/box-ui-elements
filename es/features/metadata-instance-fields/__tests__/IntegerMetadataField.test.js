import React from 'react';
import IntegerMetadataField from '../IntegerMetadataField';
describe('features/metadata-instance-editor/fields/IntegerMetadataField', function () {
  test('should correctly render an integer field', function () {
    var wrapper = shallow(React.createElement(IntegerMetadataField, {
      dataValue: "value"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});