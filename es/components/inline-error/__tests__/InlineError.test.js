import React from 'react';
import { render } from 'enzyme';
import InlineError from '..';
describe('components/inline-error/InlineError', function () {
  test('should correctly render', function () {
    var children = 'this is a message to put in the notice';
    var title = 'this is the title';
    var className = 'some-class';
    var wrapper = render(React.createElement(InlineError, {
      title: title,
      className: className
    }, children));
    expect(wrapper).toMatchSnapshot();
  });
});