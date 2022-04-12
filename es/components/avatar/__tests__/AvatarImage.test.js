import React from 'react';
import { shallow } from 'enzyme';
import AvatarImage from '../AvatarImage';
var testDataURI = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
describe('components/avatar/AvatarImage', function () {
  test('should render an img element', function () {
    var wrapper = shallow(React.createElement(AvatarImage, {
      className: "test",
      url: testDataURI
    }));
    expect(wrapper.is('img.avatar-image.test')).toBeTruthy();
    expect(wrapper.prop('src')).toEqual(testDataURI);
  });
});