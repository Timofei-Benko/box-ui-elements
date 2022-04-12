import React from 'react';
import { shallow } from 'enzyme';
import ImageTooltipContent from '../ImageTooltipContent'; // @ts-ignore flow import

import testImageSrc from '../getTestImageSrc';
describe('components/image-tooltip/ImageTooltipContent', function () {
  test('should correctly render an ImageTooltipContent', function () {
    var tooltipContent = 'Hey I am content';
    var tooltipTitle = 'I am a title';
    var image = React.createElement("img", {
      src: testImageSrc,
      alt: "foo"
    });
    var onImageLoadMock = jest.fn();
    var wrapper = shallow(React.createElement(ImageTooltipContent, {
      content: tooltipContent,
      onImageLoad: onImageLoadMock,
      title: tooltipTitle
    }, image));
    expect(wrapper).toMatchSnapshot();
  });
});