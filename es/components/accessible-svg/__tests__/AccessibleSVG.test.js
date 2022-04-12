import React from 'react';
import { shallow } from 'enzyme';
import AccessibleSVG from '../AccessibleSVG';
describe('icons/accessible-svg/AccessibleSVG', function () {
  describe('render()', function () {
    test('should correctly svg with correct props and aria labels', function () {
      var wrapper = shallow(React.createElement(AccessibleSVG, {
        "aria-labelledby": "blagh",
        className: "whatup",
        height: 24,
        role: "img",
        viewBox: "0 0 24 24",
        width: 24
      }, React.createElement("path", {
        d: "M0 1h10l-.7 1H0z"
      })));
      expect(wrapper.hasClass('whatup')).toBe(true);
      expect(wrapper.prop('width')).toEqual(24);
      expect(wrapper.prop('height')).toEqual(24);
      expect(wrapper.prop('viewBox')).toEqual('0 0 24 24');
      expect(wrapper.prop('role')).toEqual('presentation');
      expect(wrapper.prop('aria-labelledby')).toBeUndefined();
      expect(wrapper.prop('focusable')).toEqual('false');
    });
    test('should render svg with aria label, role="img", and title element when title is provided', function () {
      var wrapper = shallow(React.createElement(AccessibleSVG, {
        title: "foo"
      }, React.createElement("path", {
        d: "M0 1h10l-.7 1H0z"
      })));
      var title = wrapper.find('title');
      expect(title.length).toBe(1);
      expect(wrapper.prop('role')).toEqual('img');
      var titleID = title.prop('id');
      expect(wrapper.prop('aria-labelledby')).toEqual(titleID);
    });
    test('should render an svg with role="presentation" but no aria-label or title element when no title is provided', function () {
      var wrapper = shallow(React.createElement(AccessibleSVG, null, React.createElement("path", {
        d: "M0 1h10l-.7 1H0z"
      })));
      var title = wrapper.find('title');
      expect(title.length).toBe(0);
      expect(wrapper.prop('role')).toEqual('presentation');
      expect(wrapper.prop('aria-labelledby')).not.toBeDefined();
    });
  });
});