import React from 'react';
import Footer from '../Footer';
describe('features/metadata-instance-editor/fields/Footer', function () {
  test('should correctly render', function () {
    var wrapper = shallow(React.createElement(Footer, null));
    expect(wrapper).toMatchSnapshot();
  });
});