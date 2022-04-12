import * as React from 'react';
import { mount } from 'enzyme';
import GuideTooltip from '../GuideTooltip';
import FolderShared32 from '../../../icon/content/FolderShared32';
describe('components/guide-tooltip/GuideTooltip', function () {
  var title = React.createElement("div", null, "title");
  var body = React.createElement("div", null, "body");
  var icon = React.createElement(FolderShared32, null);
  var image = React.createElement("img", {
    alt: "test",
    src: "test"
  });
  var steps = [1, 3];
  var primaryButtonProps = {
    children: 'Next'
  };
  var secondaryButtonProps = {
    children: 'Previous'
  };

  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(GuideTooltip, props, React.createElement("div", null)));
  };

  test('should render with title and body', function () {
    var wrapper = getWrapper({
      body: body,
      title: title
    }); // hidden elements

    expect(wrapper.find('.bdl-GuideTooltip-icon').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-image').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-previousButton').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-nextButton').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-steps').length).toEqual(0); // visible elements

    expect(wrapper.find('.bdl-GuideTooltip-title').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-title').text()).toEqual('title');
    expect(wrapper.find('.bdl-GuideTooltip-body').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').text()).toEqual('body');
  });
  test('should render with just body', function () {
    var wrapper = getWrapper({
      body: body
    }); // hidden elements

    expect(wrapper.find('.bdl-GuideTooltip-title').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-icon').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-image').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-previousButton').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-nextButton').length).toEqual(0);
    expect(wrapper.find('.bdl-GuideTooltip-steps').length).toEqual(0); // visible elements

    expect(wrapper.find('.bdl-GuideTooltip-body').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').text()).toEqual('body');
  });
  test('should render with all options but icon', function () {
    var wrapper = getWrapper({
      body: body,
      title: title,
      image: image,
      primaryButtonProps: primaryButtonProps,
      secondaryButtonProps: secondaryButtonProps,
      steps: steps
    }); // hidden elements

    expect(wrapper.find('.bdl-GuideTooltip-icon').length).toEqual(0); // visible elements

    expect(wrapper.find('.bdl-GuideTooltip-title').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-title').text()).toEqual('title');
    expect(wrapper.find('.bdl-GuideTooltip-image img').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').text()).toEqual('body');
    expect(wrapper.find('Button.bdl-GuideTooltip-previousButton').length).toEqual(1);
    expect(wrapper.find('Button.bdl-GuideTooltip-nextButton').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-steps').length).toEqual(1);
  });
  test('should render with all options but image', function () {
    var wrapper = getWrapper({
      body: body,
      title: title,
      icon: icon,
      image: image,
      primaryButtonProps: primaryButtonProps,
      secondaryButtonProps: secondaryButtonProps,
      steps: steps
    }); // hidden elements

    expect(wrapper.find('.bdl-GuideTooltip-image').length).toEqual(0); // visible elements

    expect(wrapper.find('.bdl-GuideTooltip-title').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-title').text()).toEqual('title');
    expect(wrapper.find('.bdl-GuideTooltip-icon FolderShared32').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-body').text()).toEqual('body');
    expect(wrapper.find('Button.bdl-GuideTooltip-previousButton').length).toEqual(1);
    expect(wrapper.find('Button.bdl-GuideTooltip-nextButton').length).toEqual(1);
    expect(wrapper.find('.bdl-GuideTooltip-steps').length).toEqual(1);
  });
});