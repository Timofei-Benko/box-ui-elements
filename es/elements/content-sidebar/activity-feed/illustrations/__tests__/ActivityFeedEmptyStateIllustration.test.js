import * as React from 'react';
import { shallow } from 'enzyme';
import AccessibleSVG from '../../../../../icons/accessible-svg';
import ActivityFeedEmptyStateIllustration from '../ActivityFeedEmptyStateIllustration';
describe('elements/content-sidebar/activity-feed/illustrations/ActivityFeedEmptyStateIllustration', function () {
  test('should correctly add class if passed', function () {
    var wrapper = shallow(React.createElement(ActivityFeedEmptyStateIllustration, {
      className: "test"
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render icon with specified width and height', function () {
    var width = 16;
    var height = 17;
    var wrapper = shallow(React.createElement(ActivityFeedEmptyStateIllustration, {
      height: height,
      width: width
    }));
    var svg = wrapper.find(AccessibleSVG);
    expect(svg.prop('height')).toBe(height);
    expect(svg.prop('width')).toBe(width);
  });
});