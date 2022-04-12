import * as React from 'react';
import NewItemsIndicator from '../NewItemsIndicator';
describe('feature/left-sidebar/NewItemsIndicator', function () {
  test('has base classes/tags used in SASS', function () {
    var wrapper = shallow(React.createElement(NewItemsIndicator, null));
    expect(wrapper).toMatchSnapshot();
  });
  test('can receive arbitrary class names as needed', function () {
    var wrapper = shallow(React.createElement(NewItemsIndicator, {
      className: "test"
    }));
    expect(wrapper).toMatchSnapshot();
  });
});