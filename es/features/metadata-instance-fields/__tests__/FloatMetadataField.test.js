import React from 'react';
import FloatMetadataField from '../FloatMetadataField';
describe('features/metadata-instance-editor/fields/FloatMetadataField', function () {
  test('should correctly render a float field', function () {
    var wrapper = shallow(React.createElement(FloatMetadataField, {
      dataValue: "value"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});