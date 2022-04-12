import React from 'react';
import { shallow } from 'enzyme';
import MediaFigure from '../MediaFigure';
describe('components/Media/MediaFigure', function () {
  test('"as" prop changes root element', function () {
    var wrapper = shallow(React.createElement(MediaFigure, null, "foo"));
    var wrapperAs = shallow(React.createElement(MediaFigure, {
      as: "figure"
    }, "bar"));
    expect(wrapper.is('div')).toBe(true);
    expect(wrapperAs.is('figure')).toBe(true);
  });
});