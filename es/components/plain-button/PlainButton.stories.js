import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Icon from '../../icons/general/IconCopy';
import * as vars from '../../styles/variables';
import PlainButton from './PlainButton';
import { ButtonType } from '../button';
import notes from './PlainButton.stories.md';
export var regular = function regular() {
  return React.createElement(PlainButton, {
    isDisabled: boolean('isDisabled', false),
    type: ButtonType.BUTTON
  }, "Click Here");
};
export var disabled = function disabled() {
  return React.createElement(PlainButton, {
    isDisabled: true
  }, "Click Here");
};
export var fixingMargins = function fixingMargins() {
  return React.createElement(React.Fragment, null, React.createElement("div", {
    style: {
      backgroundColor: vars.bdlLightBlue20,
      display: 'inline-block'
    }
  }, React.createElement(PlainButton, null, React.createElement(Icon, null))), React.createElement("p", null, "By default the PlainButton component has margins set to 0."), React.createElement("style", null, "\n                .bdl-SpecialButtonBug {\n                    margin: 8px;\n                }\n            "), React.createElement("p", {
    style: {
      backgroundColor: vars.bdlWatermelonRed10,
      display: 'inline-block'
    }
  }, React.createElement(PlainButton, {
    className: "bdl-SpecialButtonBug"
  }, React.createElement(Icon, null))), React.createElement("p", null, "The layout jumps on hover if margin overrides are not set for the :active and :hover states.", React.createElement("pre", null, React.createElement("code", null, "\n            .bdl-SpecialButtonBug {\n                margin: $bdl-grid-unit*2;\n            }\n                "))), React.createElement("style", null, "\n                .bdl-SpecialButtonFix,\n                .bdl-SpecialButtonFix:hover,\n                .bdl-SpecialButtonFix:active {\n                    margin: 8px;\n                }\n            "), React.createElement("p", {
    style: {
      backgroundColor: vars.bdlGreenLight10,
      display: 'inline-block'
    }
  }, React.createElement(PlainButton, {
    className: "bdl-SpecialButtonFix"
  }, React.createElement(Icon, null))), React.createElement("p", null, "Workaround - use bdl-Button-margins mixin to define margins.", React.createElement("pre", null, React.createElement("code", null, "\n            .bdl-SpecialButtonFix {\n                @include bdl-Button-margins($bdl-grid-unit*2);\n            }\n                "))), React.createElement("style", null, "\n                .bdl-SpecialButtonFix2,\n                .bdl-SpecialButtonFix2:hover,\n                .bdl-SpecialButtonFix2:active {\n                    margin: 8px 12px 0 16px;\n                }\n            "), React.createElement("p", {
    style: {
      backgroundColor: vars.bdlGreenLight10,
      display: 'inline-block'
    }
  }, React.createElement(PlainButton, {
    className: "bdl-SpecialButtonFix2"
  }, React.createElement(Icon, null))), React.createElement("p", null, "You can set all 4 margins inline using shorthand property syntax.", React.createElement("pre", null, React.createElement("code", null, "\n            .bdl-SpecialButtonFix2 {\n                @include bdl-Button-margins($bdl-grid-unit*2 $bdl-grid-unit*3 0 $bdl-grid-unit*4);\n            }\n                "))), React.createElement("p", null, React.createElement("b", null, "Why not fix this?"), " We will eventually, but since this behavior is relied upon in many places it is a breaking change that needs to be rolled out strategically."));
};
export default {
  title: 'Components|Buttons/PlainButton',
  component: PlainButton,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=PlainButton.stories.js.map