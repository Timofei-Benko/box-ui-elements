import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../button/Button';
import ImageTooltip from '../ImageTooltip'; // @ts-ignore flow import

import testImageSrc from '../getTestImageSrc';
describe('components/image-tooltip/ImageTooltip', function () {
  test('should correctly render an ImageTooltip', function () {
    var image = React.createElement("img", {
      src: testImageSrc,
      alt: "foo"
    });
    var wrapper = shallow(React.createElement(ImageTooltip, {
      content: "Foo content",
      image: image,
      isShown: true,
      title: "Bar"
    }, React.createElement(Button, null, "Callout")));
    expect(wrapper.find('Tooltip')).toBeTruthy();
    expect(wrapper.find('Button')).toBeTruthy();
  });
});