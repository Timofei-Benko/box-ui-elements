import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '../../../components/menu/MenuItem';
import PaginationMenu from '../PaginationMenu';
describe('elements/Pagination/PaginationMenu', function () {
  test.each([1, 5, 10])('should render a button and menu with %i menu items', function (pageCount) {
    var wrapper = shallow(React.createElement(PaginationMenu, {
      onPageClick: jest.fn(),
      pageCount: pageCount,
      pageNumber: 1
    }));
    expect(wrapper).toMatchSnapshot();
  });
  describe('page click handler', function () {
    test('should return the page number when an item is clicked', function () {
      var onClick = jest.fn();
      var wrapper = shallow(React.createElement(PaginationMenu, {
        onPageClick: onClick,
        pageCount: 10,
        pageNumber: 1
      }));
      wrapper.find(MenuItem).at(2).simulate('click');
      expect(onClick).toBeCalledWith(3);
    });
  });
});