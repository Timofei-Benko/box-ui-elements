import * as React from 'react';
import RemoveButton from '../RemoveButton';
describe('feature/left-sidebar/features/RemoveButton', function () {
  test('should render', function () {
    var onClickRemove = function onClickRemove() {};

    var wrapper = shallow(React.createElement(RemoveButton, {
      onClickRemove: onClickRemove
    }));
    expect(wrapper).toMatchSnapshot();
  });
});