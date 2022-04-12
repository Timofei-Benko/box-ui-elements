import React from 'react';
import { shallow } from 'enzyme';
import RadarAnimation, { RadarAnimationPosition } from '../RadarAnimation';
describe('components/radar/RadarAnimation', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(RadarAnimation, props, React.createElement("div", null, "Hello")));
  };

  [{
    // description:
    //     'should render correctly with bottom-center positioning',
    position: RadarAnimationPosition.BOTTOM_CENTER
  }, {
    // description: 'should render correctly with bottom-left positioning',
    position: RadarAnimationPosition.BOTTOM_LEFT
  }, {
    // description:
    //     'should render correctly with bottom-right positioning',
    position: RadarAnimationPosition.BOTTOM_RIGHT
  }, {
    // description:
    //     'should render correctly with middle-center positioning',
    position: RadarAnimationPosition.MIDDLE_CENTER
  }, {
    // description: 'should render correctly with middle-left positioning',
    position: RadarAnimationPosition.MIDDLE_LEFT
  }, {
    // description:
    //     'should render correctly with middle-right positioning',
    position: RadarAnimationPosition.MIDDLE_RIGHT
  }, {
    // description: 'should render correctly with top-center positioning',
    position: RadarAnimationPosition.TOP_CENTER
  }, {
    // description: 'should render correctly with top-left positioning',
    position: RadarAnimationPosition.TOP_LEFT
  }, {
    // description: 'should render correctly with top-right positioning',
    position: RadarAnimationPosition.TOP_RIGHT
  }].forEach(function (_ref) {
    var position = _ref.position;
    test("should render correctly with ".concat(position, " positioning"), function () {
      var wrapper = getWrapper({
        position: position
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
  test('should spread the rest of the props to the radar node', function () {
    var wrapper = getWrapper({
      'data-resin-target': 'radaranimation1'
    });
    expect(wrapper.find('.radar').prop('data-resin-target')).toBe('radaranimation1');
  });
  test('should render with custom offset when provided', function () {
    var offset = '0 10px';
    var wrapper = getWrapper({
      offset: offset
    });
    expect(wrapper.prop('offset')).toEqual(offset);
  });
  describe('isShown', function () {
    test('should be shown when isShown is not provided', function () {
      expect(getWrapper({}).find('.radar').exists()).toBe(true);
    });
    test('should be shown when isShown is true', function () {
      expect(getWrapper({
        isShown: true
      }).find('.radar').exists()).toBe(true);
    });
    test('should not be shown when isShown is false', function () {
      expect(getWrapper({
        isShown: false
      }).find('.radar').exists()).toBe(false);
    });
  });
  describe('position instance method', function () {
    test.each([true, false])('should only position the tether when shown', function (isShown) {
      var positionTetherMock = jest.fn();
      var wrapper = getWrapper({
        isShown: isShown
      }); // @ts-ignore: react-tether shenanigans

      wrapper.instance().tetherRef = {
        current: {
          position: positionTetherMock
        }
      };
      wrapper.instance().position();
      expect(positionTetherMock).toHaveBeenCalledTimes(isShown ? 1 : 0);
    });
  });
});