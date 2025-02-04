function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as React from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { defaultRowRenderer } from '@box/react-virtualized/dist/es/Table/index';
import Portal from '../../components/portal';

var draggableRowRenderer = function draggableRowRenderer(params) {
  var index = params.index,
      key = params.key,
      rowData = params.rowData;
  var defaultRow = defaultRowRenderer(params); // Keys are auto-generated by the virtualized table based on
  // the row index. We give preference to id when available since
  // the index changes (and thus also the key) when the rows are re-ordered

  var draggableId = rowData.id || key;
  return React.createElement(Draggable, {
    draggableId: draggableId,
    index: index,
    key: draggableId
  }, function (draggableProvided, draggableSnapshot) {
    var isDragging = draggableSnapshot.isDragging;
    var draggableProps = draggableProvided.draggableProps,
        dragHandleProps = draggableProvided.dragHandleProps,
        innerRef = draggableProvided.innerRef;
    var draggableStyle = draggableProps.style;
    var _defaultRow$props = defaultRow.props,
        defaultRowClassName = _defaultRow$props.className,
        defaultRowStyle = _defaultRow$props.style;
    var className = classNames(defaultRowClassName, {
      'is-dragging': isDragging
    }); // Extend row with draggable properties

    var extendedRow = React.cloneElement(defaultRow, _objectSpread({}, draggableProps, {}, dragHandleProps, {
      ref: innerRef,
      className: className,
      // Both virtualized Table and Draggable set inline styles on
      // elements. Styles from Draggable should take precedence
      style: _objectSpread({}, defaultRowStyle, {}, draggableStyle)
    })); // Use portal when dragging so that row is on top of other elements
    // and not hidden by default VirtualizedTable styles. Portal needs to
    // have table class names in order for scoped styles to take effect

    if (isDragging) {
      return React.createElement(Portal, {
        className: "bdl-VirtualizedTable bdl-DraggableVirtualizedTable"
      }, extendedRow);
    }

    return extendedRow;
  });
};

export default draggableRowRenderer;
//# sourceMappingURL=draggableRowRenderer.js.map