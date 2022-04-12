import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import * as vars from '../../styles/variables';
import PrimaryButton from '../primary-button';
import Icon from '../../icon/line/Plus16';
import Icon2 from '../../icons/general/IconEllipsis'; // @ts-ignore flow import

import InlineNotice from '../inline-notice';
import Button from './Button';
import notes from './Button.stories.md';
export var regular = function regular() {
  var selectIcon = select('icon', {
    None: undefined,
    Icon: 'Icon'
  }, undefined);
  var selectChildren = select('children', {
    None: undefined,
    Text: 'Click Here'
  }, 'Click Here');
  return React.createElement(Button, {
    icon: selectIcon === 'Icon' ? React.createElement(Icon, null) : undefined,
    isDisabled: boolean('isDisabled', false),
    isLoading: boolean('isLoading', false),
    onClick: action('onClick called'),
    showRadar: boolean('showRadar', false),
    size: select('size', {
      None: undefined,
      Large: 'large'
    }, undefined)
  }, selectChildren ? 'Click Here' : null);
};
export var loading = function loading() {
  return React.createElement(Button, {
    isLoading: true
  }, "Click Here");
};
export var disabled = function disabled() {
  return React.createElement(Button, {
    isDisabled: true
  }, "Click Here");
};
export var withRadar = function withRadar() {
  return React.createElement(Button, {
    showRadar: true
  }, "Click Here");
};
export var large = function large() {
  return React.createElement(Button, {
    size: "large"
  }, "Click Here");
};
export var iconButton = function iconButton() {
  return React.createElement(Button, {
    icon: React.createElement(Icon2, {
      title: "Options"
    }),
    size: "large"
  });
};
export var iconAndTextButton = function iconAndTextButton() {
  return React.createElement(Button, {
    icon: React.createElement(Icon, null),
    size: "large"
  }, "Click Here");
};
export var fixingMargins = function fixingMargins() {
  return React.createElement(React.Fragment, null, React.createElement(InlineNotice, {
    type: "error",
    title: "Note"
  }, "The PlainButton variant has a ", React.createElement("b", null, "margin of 0"), " and needs special handling due to how the margin is defined for ", React.createElement("b", null, "hover/active states"), ".", React.createElement("br", null), " The methods shown below will cause problems for PlainButton. See PlainButton docs for details."), React.createElement("p", null, "By default there are 5px margins on all sides of the Button and PrimaryButton components."), React.createElement("p", {
    style: {
      backgroundColor: vars.bdlGray10,
      display: 'inline-block'
    }
  }, React.createElement(Button, null, "Cancel"), React.createElement(PrimaryButton, null, "Action")), React.createElement("p", null, "A quick fix to remove the margins is to add the ", React.createElement("code", null, "man"), " (margin-all-none) or ", React.createElement("code", null, "mrn"), "/", React.createElement("code", null, "mln"), "/", React.createElement("code", null, "mhn"), "/", React.createElement("code", null, "mvn"), " (right/left/horizontal/vertical) utility classes."), React.createElement("p", {
    style: {
      backgroundColor: vars.bdlGray10,
      display: 'inline-block'
    }
  }, React.createElement(Button, {
    className: "mln"
  }, "Cancel (mln)"), React.createElement(Button, {
    className: "mhn"
  }, "Other (mhn)"), React.createElement(PrimaryButton, {
    className: "mrn"
  }, "Action (mrn)")), React.createElement("p", null, "Alternately, you can create a CSS class and customize as needed.", React.createElement("pre", null, React.createElement("code", null, "\n        .bdl-SpecialButton {\n            margin: 0 $bdl-grid-unit;\n        }\n                    "))));
};
export default {
  title: 'Components|Buttons/Button',
  component: Button,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=Button.stories.js.map