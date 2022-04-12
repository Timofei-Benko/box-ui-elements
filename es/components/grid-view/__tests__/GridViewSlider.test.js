import React from 'react';
import GridViewSlider from '../GridViewSlider';
describe('components/grid-view/GridViewSlider', function () {
  test('should render()', function () {
    var wrapper = shallow(React.createElement(GridViewSlider, {
      columnCount: 4,
      maxColumnCount: 7,
      onChange: function onChange() {}
    }));
    expect(wrapper).toMatchSnapshot();
  });
});