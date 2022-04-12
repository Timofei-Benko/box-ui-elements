function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            scrollLeftOffset | scrollRightOffset | scrolledLeft | scrolledRight | scrolledMiddle | desc\n            ", "             | ", "            | ", "      | ", "      | ", "       | ", "\n            ", "           | ", "              | ", "     | ", "       | ", "       | ", "\n            ", "            | ", "             | ", "     | ", "      | ", "        | ", "\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            columnIndex | headerData\n            ", "        | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", "        | ", "\n            ", "        | ", "\n        "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n            columnIndex | rowIndex | cellData         | dataType\n            ", "        | ", "     | ", "       | ", "\n            ", "        | ", "     | ", " | ", "\n            ", "        | ", "     | ", "         | ", "\n            ", "        | ", "     | ", "        | ", "\n            ", "        | ", "     | ", "     | ", "\n            ", "        | ", "     | ", "     | ", "\n            ", "        | ", "     | ", "       | ", "\n            ", "        | ", "     | ", " | ", "\n            ", "        | ", "     | ", "         | ", "\n            ", "        | ", "     | ", "        | ", "\n            ", "        | ", "     | ", "     | ", "\n            ", "        | ", "     | ", "     | ", "\n        "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            type                      | value                         | valueForType\n            ", "        | ", " | ", "\n            ", "        | ", "                        | ", "\n            ", "     | ", "                       | ", "\n            ", "       | ", "                  | ", "\n            ", " | ", "              | ", "\n            ", "      | ", "                      | ", "\n            ", "      | ", "                  | ", "\n            ", "                   | ", "               | ", "\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            columnIndex | columnWidth | desc\n            ", "        | ", "       | ", "\n            ", "        | ", "      | ", "\n            ", "        | ", "      | ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import FileIcon from '../../../icons/file-icon';
import IconPencil from '../../../icons/general/IconPencil';
import PlainButton from '../../../components/plain-button';
import Tooltip from '../../../components/tooltip';
import MetadataBasedItemList from '../MetadataBasedItemList';
import { FILE_ICON_COLUMN_WIDTH, FILE_NAME_COLUMN_WIDTH, MIN_METADATA_COLUMN_WIDTH } from '../constants';
import { FIELD_TYPE_DATE, FIELD_TYPE_ENUM, FIELD_TYPE_INTEGER, FIELD_TYPE_FLOAT, FIELD_TYPE_MULTISELECT, FIELD_TYPE_STRING } from '../../metadata-instance-fields/constants';
import { FIELD_METADATA } from '../../../constants';
jest.mock('@box/react-virtualized/dist/es/AutoSizer', function () {
  return function () {
    return 'AutoSizer';
  };
});
describe('features/metadata-based-view/MetadataBasedItemList', function () {
  var wrapper;
  var instance;
  var intl = {
    formatMessage: jest.fn().mockReturnValue('Name')
  };
  var onItemClick = jest.fn();
  var onMetadataUpdate = jest.fn();
  var onClick = expect.any(Function);
  var createdAt = '2020-08-18T00:00:00.000Z';
  var templateScope = 'enterprise_12345';
  var templateKey = 'awesomeTemplate';
  var typeMetadataField = "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".type");
  var amountMetadataField = "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".amount");
  var createdMetadataField = "".concat(FIELD_METADATA, ".").concat(templateScope, ".").concat(templateKey, ".created");
  var currentCollection = {
    items: [{
      id: '1',
      metadata: {
        enterprise: {
          id: '11',
          fields: [{
            key: typeMetadataField,
            displayName: 'Type',
            type: 'string',
            value: 'bill'
          }, {
            key: amountMetadataField,
            displayName: 'Amount',
            type: 'float',
            value: 100.12
          }, {
            key: createdMetadataField,
            displayName: 'Created',
            type: 'date',
            value: createdAt
          }]
        }
      },
      name: 'name1.pdf',
      size: '123'
    }, {
      id: '2',
      metadata: {
        enterprise: {
          id: '22',
          fields: [{
            key: typeMetadataField,
            displayName: 'Type',
            type: 'string',
            value: 'receipt'
          }, {
            key: amountMetadataField,
            displayName: 'Amount',
            type: 'float',
            value: 200.88
          }, {
            key: createdMetadataField,
            displayName: 'Created',
            type: 'date',
            value: createdAt
          }]
        }
      },
      name: 'name2.mp4',
      size: '456'
    }],
    nextMarker: 'abc'
  };
  var fieldsToShow = ['size', {
    key: amountMetadataField,
    canEdit: true
  }, {
    key: createdMetadataField,
    canEdit: true,
    displayName: 'Created At'
  }, {
    key: 'invalidKey',
    canEdit: true
  } // item
  ];
  var pdfNameButton = React.createElement(PlainButton, {
    onClick: onClick,
    type: "button"
  }, currentCollection.items[0].name);
  var mp4NameButton = React.createElement(PlainButton, {
    onClick: onClick,
    type: "button"
  }, currentCollection.items[1].name);
  var pdfIcon = React.createElement(FileIcon, {
    dimension: 32,
    extension: "pdf"
  });
  var mp4Icon = React.createElement(FileIcon, {
    dimension: 32,
    extension: "mp4"
  });
  var defaultProps = {
    currentCollection: currentCollection,
    fieldsToShow: fieldsToShow,
    intl: intl,
    onItemClick: onItemClick,
    onMetadataUpdate: onMetadataUpdate
  };
  var initialState = {
    editedColumnIndex: -1,
    editedRowIndex: -1,
    hoveredRowIndex: -1,
    hoveredColumnIndex: -1,
    isUpdating: false,
    scrollLeftOffset: 0,
    scrollRightOffset: 0,
    valueBeingEdited: undefined
  };

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultProps;
    return mount(React.createElement(MetadataBasedItemList, props));
  };

  beforeEach(function () {
    wrapper = getWrapper();
    instance = wrapper.instance();
  });
  describe('componentDidUpdate()', function () {
    test('should call setState() when component gets updated with different props', function () {
      var updatedProps = {
        currentCollection: [],
        intl: intl,
        onItemClick: onItemClick
      };
      instance.setState = jest.fn();
      wrapper.setProps(updatedProps);
      expect(instance.setState).toHaveBeenCalledWith({
        editedColumnIndex: -1,
        editedRowIndex: -1,
        isUpdating: false,
        valueBeingEdited: undefined
      });
    });
    test('should not call setState() when component receives same props again', function () {
      instance.setState = jest.fn();
      wrapper.setProps(defaultProps);
      expect(instance.setState).not.toHaveBeenCalled();
    });
  });
  describe('getInitialState()', function () {
    test('should return the initial state object when called the method', function () {
      expect(instance.getInitialState()).toEqual(initialState);
    });
  });
  describe('getColumnWidth(columnIndex)', function () {
    test.each(_templateObject(), 0, 54, 'file icon', 1, 350, 'file name', 2, 250, 'metadata column')('getColumnWidth() for $desc', function (_ref) {
      var columnIndex = _ref.columnIndex,
          columnWidth = _ref.columnWidth;
      var availableWidth = 500; // width provided to AutoSizer Component

      var getWidth = instance.getColumnWidth(availableWidth);
      expect(getWidth({
        index: columnIndex
      })).toBe(columnWidth);
    });
  });
  describe('getValueForType()', function () {
    test.each(_templateObject2(), FIELD_TYPE_DATE, '2018-04-16T00:00:00.000Z', '2018-04-16T00:00:00.000Z', FIELD_TYPE_ENUM, 'A', 'A', FIELD_TYPE_INTEGER, '55', 55, FIELD_TYPE_FLOAT, '123.456', 123.456, FIELD_TYPE_MULTISELECT, ['Yes', 'No'], ['Yes', 'No'], FIELD_TYPE_STRING, 'str', 'str', FIELD_TYPE_STRING, undefined, undefined, null, 'some value', 'some value')('get correct value for type $type', function (_ref2) {
      var type = _ref2.type,
          value = _ref2.value,
          valueForType = _ref2.valueForType;
      var expectedValue = instance.getValueForType(type, value);
      expect(valueForType).toStrictEqual(expectedValue);
    });
  });
  describe('getGridCellData(columnIndex, rowIndex)', function () {
    test.each(_templateObject3(), 0, 1, pdfIcon, undefined, 1, 1, pdfNameButton, undefined, 2, 1, '123', 'string', 3, 1, 100.12, 'float', 4, 1, createdAt, 'date', 5, 1, undefined, 'string', 0, 2, mp4Icon, undefined, 1, 2, mp4NameButton, undefined, 2, 2, '456', 'string', 3, 2, 200.88, 'float', 4, 2, createdAt, 'date', 5, 2, undefined, 'string')('cellData for row: $rowIndex, column: $columnIndex', function (_ref3) {
      var columnIndex = _ref3.columnIndex,
          rowIndex = _ref3.rowIndex,
          cellData = _ref3.cellData,
          dataType = _ref3.dataType;
      var editableColumnIndex = 3; // amount field is editable

      if (columnIndex === editableColumnIndex) {
        // Set state reflecting mouse-over action for every cell in editable column
        instance.handleMouseEnter(columnIndex, rowIndex);
      }

      var data = instance.getGridCellData(columnIndex, rowIndex);

      if (columnIndex < 2 || !data) {
        // i.e. FileIcon and FileName columns
        expect(data).toEqual(cellData);
        return;
      }

      var wrap = mount(data);
      var ReadOnlyMetadataField = wrap.find('ReadOnlyMetadataField');
      expect(ReadOnlyMetadataField).toBeTruthy();
      expect(ReadOnlyMetadataField.prop('dataValue')).toEqual(cellData);
      expect(ReadOnlyMetadataField.prop('type')).toEqual(dataType);

      if (columnIndex === editableColumnIndex) {
        // Expect edit icon for editable column
        expect(wrap.contains(Tooltip)).toBe(true);
        expect(wrap.contains(IconPencil)).toBe(true);
      }
    });
  });
  describe('getGridHeaderData(columnIndex)', function () {
    test.each(_templateObject4(), 0, undefined, 1, 'Name', 2, 'size', 3, 'Amount', 4, 'Created At', 5, 'invalidKey')('headerData for column $columnIndex', function (_ref4) {
      var columnIndex = _ref4.columnIndex,
          headerData = _ref4.headerData;
      var data = instance.getGridHeaderData(columnIndex);

      if (columnIndex === 1) {
        var formatMessageWrap = mount(data);
        expect(formatMessageWrap.find(FormattedMessage)).toHaveLength(1);
      } else {
        expect(data).toBe(headerData);
      }
    });
  });
  describe('handleEditIconClick()', function () {
    test('should setState of the component with edit values for column, row, and value', function () {
      var editedColumnIndex = 4;
      var editedRowIndex = 2;
      var valueBeingEdited = 200.55;
      var editState = {
        editedColumnIndex: editedColumnIndex,
        editedRowIndex: editedRowIndex,
        valueBeingEdited: valueBeingEdited
      };
      instance.setState = jest.fn();
      instance.handleEditIconClick(editedColumnIndex, editedRowIndex, valueBeingEdited);
      expect(instance.setState).toHaveBeenCalledWith(editState);
    });
  });
  describe('handleItemClick(item)', function () {
    test('should invoke the onItemClick after adding can_preview permissions', function () {
      var permissions = {
        can_preview: true,
        can_upload: true
      };
      var item = currentCollection.items[0];

      var itemWithPreviewPermission = _objectSpread({}, item, {
        permissions: permissions
      });

      instance.handleItemClick(item);
      expect(onItemClick).toHaveBeenCalledWith(itemWithPreviewPermission);
    });
  });
  describe('handleMouseEnter()', function () {
    test('should handle mouse over event by setting state accordingly', function () {
      instance.handleMouseEnter(5, 8);
      expect(instance.state.hoveredColumnIndex).toBe(5);
      expect(instance.state.hoveredRowIndex).toBe(8);
    });
  });
  describe('handleMouseLeave()', function () {
    test('should handle mouse leave event by setting state accordingly', function () {
      instance.handleMouseLeave();
      expect(instance.state.hoveredRowIndex).toBe(-1);
    });
  });
  describe('handleContentScroll()', function () {
    test('should handle content scroll in non-sticky columns', function () {
      var clientWidth = 50;
      var scrollLeft = 10;
      var scrollWidth = 100;
      instance.setState = jest.fn();
      instance.handleContentScroll({
        clientWidth: clientWidth,
        scrollLeft: scrollLeft,
        scrollWidth: scrollWidth
      });
      expect(instance.setState).toHaveBeenCalledWith({
        scrollLeftOffset: scrollLeft,
        scrollRightOffset: scrollWidth - clientWidth - scrollLeft
      });
    });
  });
  describe('handleSave()', function () {
    test('should call onMetadataUpdate from props to update metadata with relevant params', function () {
      var item = currentCollection.items[0];

      var itemWithPermission = _objectSpread({}, item, {
        permissions: {}
      });

      var field = 'amount';
      var currentValue = 111.22;
      var editedValue = 333.66;
      instance.getItemWithPermissions = jest.fn().mockReturnValue(itemWithPermission);
      instance.getValueForType = jest.fn().mockReturnValue(editedValue);
      instance.setState = jest.fn();
      instance.handleSave(item, field, FIELD_TYPE_FLOAT, currentValue, editedValue);
      expect(instance.props.onMetadataUpdate).toHaveBeenCalledWith(itemWithPermission, field, currentValue, editedValue);
      expect(instance.setState).toHaveBeenCalledWith({
        isUpdating: true
      });
    });
  });
  describe('cellRenderer()', function () {
    test.each([[{
      columnIndex: 0,
      rowIndex: 2,
      key: 'key',
      style: {}
    }, true, false], [{
      columnIndex: 1,
      rowIndex: 2,
      key: 'key',
      style: {}
    }, false, true]])('should have correct class names', function (arg, hasFileIconClass, hasFileNameClass) {
      var cell = shallow(instance.cellRenderer(arg));
      expect(cell.hasClass('bdl-MetadataBasedItemList-cell')).toBe(true);
      expect(cell.hasClass('bdl-MetadataBasedItemList-cell--fileIcon')).toBe(hasFileIconClass);
      expect(cell.hasClass('bdl-MetadataBasedItemList-cell--filename')).toBe(hasFileNameClass);
    });
    test('should have hovered class for adding background color on row hover', function () {
      var hoverRowIndex = 1;
      var hoverColumnIndex = 5;
      instance.handleMouseEnter(hoverColumnIndex, hoverRowIndex); // Hover over row

      var cell = shallow(instance.cellRenderer({
        columnIndex: 0,
        rowIndex: hoverRowIndex,
        key: 'key',
        style: {}
      }));
      expect(cell.hasClass('bdl-MetadataBasedItemList-cell--hover')).toBe(true);
    });
  });
  describe('getScrollPositionClasses(width)', function () {
    test.each(_templateObject5(), 0, 100, true, false, false, 'all the way to the left', 100, 0, false, true, false, 'all the way to the right', 50, 50, false, false, true, 'in the middle')('should return correct classes when content is scrolled $desc', function (_ref5) {
      var scrollLeftOffset = _ref5.scrollLeftOffset,
          scrollRightOffset = _ref5.scrollRightOffset,
          scrolledLeft = _ref5.scrolledLeft,
          scrolledRight = _ref5.scrolledRight,
          scrolledMiddle = _ref5.scrolledMiddle;
      instance.calculateContentWidth = jest.fn().mockReturnValue(600);
      wrapper.setState({
        scrollLeftOffset: scrollLeftOffset,
        scrollRightOffset: scrollRightOffset
      });
      var classes = instance.getScrollPositionClasses(500);
      expect(classes['is-scrolledLeft']).toBe(scrolledLeft);
      expect(classes['is-scrolledRight']).toBe(scrolledRight);
      expect(classes['is-scrolledMiddle']).toBe(scrolledMiddle);
    });
  });
  describe('calculateContentWidth()', function () {
    test('should return total width of the content', function () {
      var width = FILE_ICON_COLUMN_WIDTH + FILE_NAME_COLUMN_WIDTH + fieldsToShow.length * MIN_METADATA_COLUMN_WIDTH;
      expect(instance.calculateContentWidth()).toBe(width);
    });
  });
  describe('getQueryResponseFields()', function () {
    test('should return a list of metadata fields to display', function () {
      var response = instance.getQueryResponseFields();
      var fields = [{
        key: typeMetadataField,
        displayName: 'Type'
      }, {
        key: amountMetadataField,
        displayName: 'Amount'
      }, {
        key: createdMetadataField,
        displayName: 'Created'
      }];
      expect(response).toEqual(fields);
    });
  });
  describe('isMetadataField()', function () {
    test('should return a boolean indicating if the field is metadata field or not (item field)', function () {
      expect(instance.isMetadataField(amountMetadataField)).toBe(true);
      expect(instance.isMetadataField('size')).toBe(false);
    });
  });
  describe('getFieldNameFromKey()', function () {
    test('should return a field name from the field key', function () {
      expect(instance.getFieldNameFromKey(amountMetadataField)).toBe('amount');
      expect(instance.getFieldNameFromKey('size')).toBe('size');
    });
  });
  describe('render()', function () {
    test('should render a default component correctly', function () {
      expect(wrapper.find('AutoSizer')).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});