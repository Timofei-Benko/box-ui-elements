import React from 'react';
import { shallow } from 'enzyme';
import Add from '../Add';
import GridViewSlider from '../../../../components/grid-view/GridViewSlider';
import SubHeaderRight from '../SubHeaderRight';
import ViewModeChangeButton from '../ViewModeChangeButton';
import { VIEW_FOLDER, VIEW_MODE_GRID } from '../../../../constants';

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(SubHeaderRight, props));
};

describe('Elements/SubHeader/SubHeaderRight', function () {
  var currentCollection = {
    sortBy: '',
    sortDirection: '',
    items: ['123']
  };
  test.each([[VIEW_FOLDER, false], [VIEW_MODE_GRID, true]])('%s shows grid view slider %s', function (viewMode, expectation) {
    var wrapper = getWrapper({
      viewMode: viewMode,
      currentCollection: currentCollection
    });
    expect(wrapper.exists(GridViewSlider)).toBe(expectation);
  });
  test.each([[0, 0], [1, 1]])('should show %i grid view buttons on toolbar', function (columns, expectation) {
    var wrapper = getWrapper({
      gridColumnCount: columns,
      currentCollection: currentCollection
    });
    expect(wrapper.find(ViewModeChangeButton).length).toEqual(expectation);
  });
  test.each([[VIEW_FOLDER, true], [VIEW_MODE_GRID, false]])('Add button with %s on toolbar should be %s', function (view, expectation) {
    var wrapper = getWrapper({
      canUpload: expectation,
      canCreateNewFolder: expectation,
      view: view,
      currentCollection: currentCollection
    });
    expect(wrapper.exists(Add)).toBe(expectation);
  });
});