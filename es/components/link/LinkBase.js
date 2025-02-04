function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';

var LinkBase = function LinkBase(_ref) {
  var children = _ref.children,
      _ref$href = _ref.href,
      href = _ref$href === void 0 ? '#' : _ref$href,
      linkRef = _ref.linkRef,
      target = _ref.target,
      rel = _ref.rel,
      component = _ref.component,
      refProp = _ref.refProp,
      rest = _objectWithoutProperties(_ref, ["children", "href", "linkRef", "target", "rel", "component", "refProp"]);

  // Automatically append rel="noopener" for external links
  // (security fix) if no `rel` was passed
  var linkRel = target === '_blank' && !rel ? 'noopener' : rel;
  var LinkComponent = component || 'a';

  var ref = _defineProperty({}, refProp || 'ref', linkRef);

  return React.createElement(LinkComponent, _extends({
    href: href,
    rel: linkRel,
    target: target
  }, ref, rest), children);
};

export default LinkBase;
//# sourceMappingURL=LinkBase.js.map