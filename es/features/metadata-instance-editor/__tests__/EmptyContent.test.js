import React from 'react';
import EmptyContent from '../EmptyContent';
describe('features/metadata-instance-editor/EmptyContent', function () {
  test('should correctly render', function () {
    var wrapper = shallow(React.createElement(EmptyContent, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render edit mode when canAdd is passed', function () {
    var wrapper = shallow(React.createElement(EmptyContent, {
      canAdd: true
    }));
    expect(wrapper).toMatchSnapshot();
  });
});