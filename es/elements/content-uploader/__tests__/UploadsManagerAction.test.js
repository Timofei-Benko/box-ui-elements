import React from 'react';
import { shallow } from 'enzyme';
import UploadsManagerAction from '../UploadsManagerAction';
describe('elements/content-uploader/UploadsManagerAction', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(UploadsManagerAction, props));
  };

  test('should render correctly with hasMultipleFailedUploads as true', function () {
    var wrapper = getWrapper({
      hasMultipleFailedUploads: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correctly with hasMultipleFailedUploads as false', function () {
    var wrapper = getWrapper({
      hasMultipleFailedUploads: false
    });
    expect(wrapper).toMatchSnapshot();
  });
});