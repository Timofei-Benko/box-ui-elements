import * as React from 'react';
import GuideTooltip from './GuideTooltip';
import Button from '../button/Button';
import FolderShared32 from '../../icon/content/FolderShared32';
import notes from './GuideTooltip.stories.md'; // @ts-ignore flow import

import testImageSrc from './test-image.png';

var addSpacing = function addSpacing(component) {
  return React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, component);
};

export var allOptionsWithIcon = function allOptionsWithIcon() {
  return addSpacing(React.createElement(GuideTooltip, {
    title: "Lorem Ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    icon: React.createElement(FolderShared32, null),
    steps: [1, 3]
    /* eslint-disable no-console */
    ,
    primaryButtonProps: {
      children: 'Next',
      onClick: function onClick() {
        return console.log('next');
      }
    },
    secondaryButtonProps: {
      children: 'Back',
      onClick: function onClick() {
        return console.log('back');
      }
    }
    /* eslint-enable no-console */

  }, React.createElement(Button, null, "example")));
};
allOptionsWithIcon.story = {
  name: 'body, icon, steps, title, next button, previous button'
};
export var titleImageBody = function titleImageBody() {
  return addSpacing(React.createElement(GuideTooltip, {
    title: "Lorem Ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: React.createElement("img", {
      src: testImageSrc,
      alt: "Lorem ipsum dolor"
    })
  }, React.createElement(Button, null, "example")));
};
titleImageBody.story = {
  name: 'title, image, body'
};
export var noButtons = function noButtons() {
  return addSpacing(React.createElement(GuideTooltip, {
    title: "Lorem Ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    icon: React.createElement(FolderShared32, null),
    steps: [1, 3]
  }, React.createElement(Button, null, "example")));
};
noButtons.story = {
  name: 'body, icon, steps, title'
};
export var onlyTitleBody = function onlyTitleBody() {
  return addSpacing(React.createElement(GuideTooltip, {
    title: "Lorem Ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }, React.createElement(Button, null, "example")));
};
onlyTitleBody.story = {
  name: 'only title and body'
};
export var onlyBody = function onlyBody() {
  return addSpacing(React.createElement(GuideTooltip, {
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }, React.createElement(Button, null, "example")));
};
onlyBody.story = {
  name: 'only body'
};
export default {
  title: 'Components|GuideTooltip',
  component: GuideTooltip,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=GuideTooltip.stories.js.map