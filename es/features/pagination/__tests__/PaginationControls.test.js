import React from 'react';
import { shallow } from 'enzyme';
import PaginationControls from '../PaginationControls';
describe('elements/Pagination/PaginationControls', function () {
  test.each([true, false])('should render properly for offset based and marker based pagination', function (isOffsetBasedPagination) {
    var props = {
      handleNextClick: jest.fn(),
      handlePreviousClick: jest.fn(),
      hasNextPage: false,
      hasPreviousPage: true,
      isOffsetBasedPagination: isOffsetBasedPagination,
      onPageClick: jest.fn(),
      pageCount: 5,
      pageNumber: 1
    };
    var wrapper = shallow(React.createElement(PaginationControls, props));
    expect(wrapper.find('.bdl-Pagination')).toHaveLength(1);
    expect(wrapper.find('.bdl-Pagination-count')).toHaveLength(isOffsetBasedPagination ? 1 : 0);
    expect(wrapper.find('.bdl-Pagination-nav')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});