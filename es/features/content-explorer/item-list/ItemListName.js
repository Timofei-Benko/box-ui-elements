function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import PropTypes from 'prop-types';
import React from 'react';
import PlainButton from '../../../components/plain-button';
import IconChevron from '../../../icons/general/IconChevron';
import ItemTypes from '../item-types';
import { ItemTypePropType } from '../prop-types';
var ITEM_LIST_NAME_CLASS = 'item-list-name';

var ItemListName = function ItemListName(_ref) {
  var _ref$itemId = _ref.itemId,
      itemId = _ref$itemId === void 0 ? '' : _ref$itemId,
      type = _ref.type,
      name = _ref.name,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      _ref$isSelected = _ref.isSelected,
      isSelected = _ref$isSelected === void 0 ? false : _ref$isSelected,
      onClick = _ref.onClick,
      linkRenderer = _ref.linkRenderer;
  var isFolder = type === ItemTypes.FOLDER;
  var linkProps = {
    className: "lnk ".concat(ITEM_LIST_NAME_CLASS),
    onClick: onClick,
    children: [React.createElement("span", {
      key: "name"
    }, name), React.createElement(IconChevron, {
      key: "icon",
      color: isSelected ? '#447991' : '#333',
      direction: "right",
      size: "4px",
      thickness: "1px"
    })]
  };

  var renderLink = function renderLink() {
    return linkRenderer ? linkRenderer(_objectSpread({}, linkProps, {
      itemId: itemId
    })) : React.createElement(PlainButton, linkProps);
  };

  return React.createElement("div", {
    className: "item-list-name-container"
  }, isFolder ? renderLink() : React.createElement("span", {
    className: ITEM_LIST_NAME_CLASS
  }, name), !!label && React.createElement("span", {
    className: "item-list-name-label"
  }, label));
};

ItemListName.propTypes = {
  itemId: PropTypes.string,
  type: ItemTypePropType,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  linkRenderer: PropTypes.func
};
export default ItemListName;
//# sourceMappingURL=ItemListName.js.map