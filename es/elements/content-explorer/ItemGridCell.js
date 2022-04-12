function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import ItemGridThumbnail from './ItemGridThumbnail';
import MoreOptions from './MoreOptions';
import Name from '../common/item/Name';
import './ItemGridCell.scss';

var ItemGridCell = function ItemGridCell(_ref) {
  var canPreview = _ref.canPreview,
      isSmall = _ref.isSmall,
      isTouch = _ref.isTouch,
      item = _ref.item,
      onItemClick = _ref.onItemClick,
      onItemSelect = _ref.onItemSelect,
      rootId = _ref.rootId,
      view = _ref.view,
      rest = _objectWithoutProperties(_ref, ["canPreview", "isSmall", "isTouch", "item", "onItemClick", "onItemSelect", "rootId", "view"]);

  return React.createElement("figure", {
    className: "bce-ItemGridCell"
  }, React.createElement(ItemGridThumbnail, {
    item: item
  }), React.createElement("figcaption", {
    className: "bce-ItemGridCell-figcaption"
  }, React.createElement(Name, {
    canPreview: canPreview,
    isTouch: isTouch,
    item: item,
    onItemClick: onItemClick,
    onItemSelect: onItemSelect,
    rootId: rootId,
    showDetails: true,
    view: view
  }), React.createElement(MoreOptions, _extends({
    canPreview: canPreview,
    isSmall: true,
    item: item,
    onItemSelect: onItemSelect
  }, rest))));
};

export default ItemGridCell;
//# sourceMappingURL=ItemGridCell.js.map