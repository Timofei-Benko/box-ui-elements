function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { BrowserRouter as Router, Link as RouterLink } from 'react-router-dom';
import { select } from '@storybook/addon-knobs';
import LinkPrimaryButton from '../LinkPrimaryButton';
import notes from './LinkPrimaryButton.stories.md';
export var basic = function basic() {
  return React.createElement(LinkPrimaryButton, {
    href: "https://www.box.com/platform",
    size: select('size', {
      None: undefined,
      Large: 'large'
    }, undefined)
  }, "A link that looks like a PrimaryButton");
};
export var large = function large() {
  return React.createElement(LinkPrimaryButton, {
    href: "https://www.box.com/platform",
    size: "large"
  }, "A link that looks like a PrimaryButton");
};
export var withCustomComponent = function withCustomComponent() {
  // You can pass a custom component to be used instead of the default "a" tag, like a React Router link:
  // import { BrowserRouter as Router, Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
  var CustomRouterLink = function CustomRouterLink(_ref) {
    var href = _ref.href,
        children = _ref.children,
        rest = _objectWithoutProperties(_ref, ["href", "children"]);

    return React.createElement(RouterLink, _extends({
      to: href
    }, rest), children);
  };

  return React.createElement(Router, null, React.createElement(LinkPrimaryButton, {
    href: "/",
    component: CustomRouterLink
  }, "A link"));
};
export default {
  title: 'Components|Links/LinkPrimaryButton',
  component: LinkPrimaryButton,
  parameters: {
    notes: notes
  }
};
//# sourceMappingURL=LinkPrimaryButton.stories.js.map