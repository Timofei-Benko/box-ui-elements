import React from 'react';
import { shallow } from 'enzyme';
import ProgressBar from '../ProgressBar';
describe('componentDidUpdate()', function () {
  test('it should increment the progress bar', function () {
    var component = shallow(React.createElement(ProgressBar, {
      percent: 20
    }));
    component.setProps({
      percent: 30
    });
    expect(component.state('percent')).toEqual(30);
  });
});