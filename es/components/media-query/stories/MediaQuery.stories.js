import * as React from 'react';
import { VIEW_SIZE_TYPE } from '../constants';
import notes from './MediaQuery.stories.md';
import useMediaQuery from '../useMediaQuery';
import withMediaQuery from '../withMediaQuery';
export var CustomHook = function CustomHook() {
  var _useMediaQuery = useMediaQuery(),
      hover = _useMediaQuery.hover,
      pointer = _useMediaQuery.pointer,
      size = _useMediaQuery.size,
      viewWidth = _useMediaQuery.viewWidth,
      viewHeight = _useMediaQuery.viewHeight;

  return React.createElement("div", null, React.createElement("p", null, React.createElement("b", null, "Hover:"), React.createElement("span", null, " ".concat(hover))), React.createElement("p", null, React.createElement("b", null, "Pointer:"), React.createElement("span", null, " ".concat(pointer))), React.createElement("p", null, React.createElement("b", null, "View Dimensions:"), React.createElement("span", null, " ".concat(viewWidth, "px (w) x ").concat(viewHeight, "px (h)"))), size === VIEW_SIZE_TYPE.small && React.createElement("h4", null, "This view is small"), size === VIEW_SIZE_TYPE.medium && React.createElement("h3", null, "This view is medium"), size === VIEW_SIZE_TYPE.large && React.createElement("h2", null, "This view is large"), size === VIEW_SIZE_TYPE.xlarge && React.createElement("h1", null, "This view is xlarge"));
};

var DemoComponent = function DemoComponent(props) {
  var hover = props.hover,
      pointer = props.pointer,
      size = props.size,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight;
  return React.createElement("div", null, React.createElement("p", null, React.createElement("b", null, "Hover:"), React.createElement("span", null, " ".concat(hover))), React.createElement("p", null, React.createElement("b", null, "Pointer:"), React.createElement("span", null, " ".concat(pointer))), React.createElement("p", null, React.createElement("b", null, "View Dimensions:"), React.createElement("span", null, " ".concat(viewWidth, "px (w) x ").concat(viewHeight, "px (h)"))), size === 'small' && React.createElement("h4", null, "This view is small"), size === 'medium' && React.createElement("h3", null, "This view is medium"), size === 'large' && React.createElement("h2", null, "This view is large"), size === 'x-large' && React.createElement("h1", null, "This view is xlarge"));
};

export var HigherOrderComponent = withMediaQuery(DemoComponent);
export default {
  title: 'Components|MediaQuery',
  component: useMediaQuery,
  parameters: {
    notes: notes,
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};
//# sourceMappingURL=MediaQuery.stories.js.map