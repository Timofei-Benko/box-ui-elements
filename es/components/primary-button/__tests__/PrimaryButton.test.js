import React from 'react';
import { shallow } from 'enzyme';
import PrimaryButton from '..';
import Button from '../../button';
describe('components/primary-button/PrimaryButton', function () {
  test('should correctly render children in primary button', function () {
    var children = 'yooo';
    var wrapper = shallow(React.createElement(PrimaryButton, null, children));
    expect(wrapper.find(Button).length).toEqual(1);
    expect(wrapper.hasClass('btn-primary')).toBe(true);
    expect(wrapper.contains(children)).toBe(true);
  });
});