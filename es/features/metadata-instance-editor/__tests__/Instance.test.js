function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import TEMPLATE_CUSTOM_PROPERTIES from '../constants';
import { InstanceBase as Instance } from '../Instance';
import { isValidValue } from '../../metadata-instance-fields/validateMetadataField';
jest.mock('../../metadata-instance-fields/validateMetadataField');
var data = {
  stringfield: 'some string',
  floatfield: 1,
  enumfield: 'yes',
  datefield: '2018-06-20T00:00:00.000Z',
  multiselectfield: ['yes', 'no']
};
var fields = [{
  id: 'field0',
  type: 'string',
  key: 'nodescfield',
  displayName: 'No Description Field'
}, {
  id: 'field1',
  type: 'string',
  key: 'stringfield',
  displayName: 'String Field',
  description: 'example of a string field'
}, {
  id: 'field2',
  type: 'string',
  key: 'emptystring',
  displayName: 'Empty String Field',
  description: 'example of an empty string field'
}, {
  id: 'field3',
  type: 'float',
  key: 'floatfield',
  displayName: 'Float Field',
  description: 'example of a float field'
}, {
  id: 'field4',
  type: 'float',
  key: 'emptyfloat',
  displayName: 'Empty Float Field',
  description: 'example of an empty float field'
}, {
  id: 'field5',
  type: 'enum',
  key: 'enumfield',
  displayName: 'Enum Field',
  description: 'example of a enum field',
  options: [{
    key: 'yes'
  }, {
    key: 'no'
  }]
}, {
  id: 'field6',
  type: 'enum',
  key: 'emptyenumfield',
  displayName: 'Empty Enum Field',
  description: 'example of an empty enum field',
  options: [{
    key: 'yes'
  }, {
    key: 'no'
  }]
}, {
  id: 'field7',
  type: 'date',
  key: 'datefield',
  displayName: 'Date Field',
  description: 'example of a date field'
}, {
  id: 'field8',
  type: 'date',
  key: 'emptydatefield',
  displayName: 'Empty Date Field',
  description: 'example of an empty date field'
}, {
  id: 'field9',
  type: 'multiSelect',
  key: 'multiselectfield',
  displayName: 'Multi Select Field',
  description: 'example of a multi select field field',
  options: [{
    key: 'yes'
  }, {
    key: 'no'
  }, {
    key: 'maybe'
  }, {
    key: 'idk?'
  }, {
    key: 'oh well'
  }, {
    key: 'whatever'
  }]
}];
var allFieldsHidden = [{
  id: 'field0',
  type: 'string',
  key: 'nodescfield',
  displayName: 'No Description Field that is hidden',
  hidden: true
}, {
  id: 'field1',
  type: 'string',
  key: 'nodescfield',
  displayName: 'No Description Field that is also hidden',
  isHidden: true
}];
var noFieldsInTemplate = [];
var singleTemplateField = [{
  id: 'field0',
  type: 'enum',
  key: 'emptyenumfield',
  displayName: 'Empty Enum Field',
  description: 'example of an empty enum field'
}];
var customTemplateField = [{
  id: 'field0',
  type: 'enum',
  key: 'emptyenumfield',
  displayName: 'Empty Enum Field',
  description: 'example of an empty enum field',
  templateKey: TEMPLATE_CUSTOM_PROPERTIES
}];
var userDefinedTemplateField = [{
  id: 'field0',
  type: 'enum',
  key: 'emptyenumfield',
  displayName: 'Empty Enum Field',
  description: 'example of an empty enum field',
  templateKey: 'not properties'
}];
var intl = {
  formatMessage: function formatMessage() {}
};
describe('features/metadata-instance-editor/fields/Instance', function () {
  test('should correctly render templated metadata instance', function () {
    var wrapper = shallow(React.createElement(Instance, {
      data: data,
      dataValue: "value",
      intl: intl,
      template: {
        fields: fields
      }
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render templated metadata instance with CascadePolicy', function () {
    var wrapper = shallow(React.createElement(Instance, {
      cascadePolicy: {
        canEdit: true,
        id: 'hello'
      },
      data: data,
      dataValue: "value",
      intl: intl,
      isCascadingPolicyApplicable: true,
      shouldShowCascadingOptions: true,
      template: {
        fields: fields
      }
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render custom metadata instance', function () {
    var wrapper = shallow(React.createElement(Instance, {
      data: data,
      dataValue: "value",
      intl: intl,
      template: {
        fields: fields,
        templateKey: 'properties'
      }
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should not render footer when not editing', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      onRemove: jest.fn(),
      template: {
        fields: fields
      }
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render the footer', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        fields: fields
      }
    }));
    wrapper.setState({
      isEditing: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render the footer even when all fields are hidden', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        fields: allFieldsHidden
      }
    }));
    wrapper.setState({
      isEditing: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render the footer even when there are no fields in a template', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        fields: noFieldsInTemplate
      }
    }));
    wrapper.setState({
      isEditing: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render the footer with save button when dirty', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isDirty: true,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        fields: fields
      }
    }));
    wrapper.setState({
      isEditing: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render the busy indicator', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        fields: fields
      }
    }));
    wrapper.setState({
      isBusy: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('isOpen should be true if the prop is not undefined', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: singleTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        singleTemplateField: singleTemplateField
      }
    }));
    expect(wrapper.instance().props.isOpen).toBe(true);
  });
  test('collapsible isOpen prop should be true', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: singleTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        singleTemplateField: singleTemplateField
      }
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('message id should be fileMetadataRemoveCustomTemplateConfirm', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: customTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        customTemplateField: customTemplateField
      }
    }));
    var expectedMessage = 'boxui.metadataInstanceEditor.fileMetadataRemoveCustomTemplateConfirm';
    var formattedMessage = wrapper.instance().renderDeleteMessage(true, customTemplateField[0]);
    expect(formattedMessage.props.id).toEqual(expectedMessage);
    expect(formattedMessage).toMatchSnapshot();
  });
  test('message id should be folderMetadataRemoveCustomTemplateConfirm', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: customTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        customTemplateField: customTemplateField
      }
    }));
    var expectedMessage = 'boxui.metadataInstanceEditor.folderMetadataRemoveCustomTemplateConfirm';
    var formattedMessage = wrapper.instance().renderDeleteMessage(false, customTemplateField[0]);
    expect(formattedMessage.props.id).toEqual(expectedMessage);
    expect(formattedMessage).toMatchSnapshot();
  });
  test('message id should be fileMetadataRemoveTemplateConfirm', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: userDefinedTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        userDefinedTemplateField: userDefinedTemplateField
      }
    }));
    var expectedMessage = 'boxui.metadataInstanceEditor.fileMetadataRemoveTemplateConfirm';
    var formattedMessage = wrapper.instance().renderDeleteMessage(true, userDefinedTemplateField[0]);
    expect(formattedMessage.props.id).toEqual(expectedMessage);
    expect(formattedMessage).toMatchSnapshot();
  });
  test('message id should be folderMetadataRemoveTemplateConfirm', function () {
    var wrapper = shallow(React.createElement(Instance, {
      canEdit: true,
      data: data,
      dataValue: "value",
      intl: intl,
      isOpen: userDefinedTemplateField.length === 1,
      onModification: jest.fn(),
      onRemove: jest.fn(),
      onSave: jest.fn(),
      template: {
        userDefinedTemplateField: userDefinedTemplateField
      }
    }));
    var expectedMessage = 'boxui.metadataInstanceEditor.folderMetadataRemoveTemplateConfirm';
    var formattedMessage = wrapper.instance().renderDeleteMessage(false, userDefinedTemplateField[0]);
    expect(formattedMessage.props.id).toEqual(expectedMessage);
    expect(formattedMessage).toMatchSnapshot();
  });
  describe('createJSONPatch()', function () {
    test('should correctly create a JSON patch', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      var currentData = {
        stringfield: 'some new string',
        floatfield: 1,
        newfield: 'new field',
        multiselectfield: ['yes', 'no']
      };
      expect(instance.createJSONPatch(currentData, data)).toEqual([{
        op: 'test',
        path: '/stringfield',
        value: 'some string'
      }, {
        op: 'replace',
        path: '/stringfield',
        value: 'some new string'
      }, {
        op: 'test',
        path: '/enumfield',
        value: 'yes'
      }, {
        op: 'remove',
        path: '/enumfield'
      }, {
        op: 'test',
        path: '/datefield',
        value: '2018-06-20T00:00:00.000Z'
      }, {
        op: 'remove',
        path: '/datefield'
      }, {
        op: 'add',
        path: '/newfield',
        value: 'new field'
      }]);
    });
    test('should correctly create a JSON patch with multi select diffs', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      var currentData = {
        stringfield: 'some new string',
        floatfield: 1,
        newfield: 'new field',
        multiselectfield: ['no', 'yes']
      };
      expect(instance.createJSONPatch(currentData, data)).toEqual([{
        op: 'test',
        path: '/stringfield',
        value: 'some string'
      }, {
        op: 'replace',
        path: '/stringfield',
        value: 'some new string'
      }, {
        op: 'test',
        path: '/enumfield',
        value: 'yes'
      }, {
        op: 'remove',
        path: '/enumfield'
      }, {
        op: 'test',
        path: '/datefield',
        value: '2018-06-20T00:00:00.000Z'
      }, {
        op: 'remove',
        path: '/datefield'
      }, {
        op: 'test',
        path: '/multiselectfield',
        value: ['yes', 'no']
      }, {
        op: 'replace',
        path: '/multiselectfield',
        value: ['no', 'yes']
      }, {
        op: 'add',
        path: '/newfield',
        value: 'new field'
      }]);
    });
  });
  describe('onFieldChange()', function () {
    test('should not do anything when not editing', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.isEditing = jest.fn().mockReturnValueOnce(false);
      instance.onFieldChange('multiselectfield', ['yes'], 'multiSelect');
      wrapper.update();
      expect(isValidValue).not.toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
    test('should not do anything when current and prior value is the same', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.isEditing = jest.fn().mockReturnValueOnce(true);
      instance.onFieldChange('multiselectfield', ['yes', 'no'], 'multiSelect');
      wrapper.update();
      expect(isValidValue).not.toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
    test('should validate and set state when editing and prior value isnt the same', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.isEditing = jest.fn().mockReturnValueOnce(true);
      instance.onFieldChange('multiselectfield', ['no', 'yes'], 'multiSelect');
      wrapper.update();
      expect(isValidValue).toBeCalled();
      expect(instance.setState).toBeCalled();
    });
    test('should add an error to the state if field was invalid', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.isEditing = jest.fn().mockReturnValueOnce(true);
      isValidValue.mockReturnValueOnce(false);
      instance.onFieldChange('multiselectfield', ['no', 'yes'], 'multiSelect');
      wrapper.update();
      expect(isValidValue).toBeCalledWith('multiSelect', ['no', 'yes']);
      expect(instance.setState).toBeCalledWith({
        data: _objectSpread({}, data, {
          multiselectfield: ['no', 'yes']
        }),
        errors: {
          multiselectfield: expect.any(Object)
        }
      }, expect.any(Function));
    });
    test('should remove prior errors related to the changed field', function () {
      var wrapper = shallow(React.createElement(Instance, {
        canEdit: true,
        data: data,
        dataValue: "value",
        intl: intl,
        onModification: jest.fn(),
        onRemove: jest.fn(),
        onSave: jest.fn(),
        template: {
          fields: fields
        }
      }));
      wrapper.setState({
        errors: {
          multiselectfield: 'error'
        }
      });
      wrapper.update();
      var instance = wrapper.instance();
      instance.setState = jest.fn();
      instance.isEditing = jest.fn().mockReturnValueOnce(true);
      isValidValue.mockReturnValueOnce(true);
      instance.onFieldChange('multiselectfield', ['no', 'yes'], 'multiSelect');
      wrapper.update();
      expect(isValidValue).toBeCalledWith('multiSelect', ['no', 'yes']);
      expect(instance.setState).toBeCalledWith({
        data: _objectSpread({}, data, {
          multiselectfield: ['no', 'yes']
        }),
        errors: {}
      }, expect.any(Function));
    });
  });
  describe('Lifecycle methods', function () {
    describe('componentDidUpdate()', function () {
      test('should mark is editing and remove loader if errored', function () {
        var wrapper = shallow(React.createElement(Instance, {
          template: {
            fields: fields
          },
          canEdit: true
        }));
        wrapper.setProps({
          hasError: true
        });
        expect(wrapper.state('isBusy')).toEqual(false);
        expect(wrapper.state('isEditing')).toEqual(true);
      });
      test('form has switched from dirty to a clean state', function () {
        var wrapper = shallow(React.createElement(Instance, {
          isDirty: true,
          template: {
            fields: fields
          },
          canEdit: true
        }));
        wrapper.setState({
          isEditing: true
        });
        wrapper.setProps({
          isDirty: false
        });
        expect(wrapper.state('isBusy')).toEqual(false);
      });
      test('form has switched from dirty to a clean state', function () {
        var wrapper = shallow(React.createElement(Instance, {
          isDirty: true,
          template: {
            fields: fields
          },
          canEdit: true
        }));
        wrapper.setState({
          isEditing: false
        });
        wrapper.setProps({
          isDirty: false
        });
        expect(wrapper.state('isBusy')).toEqual(false);
        expect(wrapper.state('isCascadingOverwritten')).toEqual(false);
      });
    });
  });
});