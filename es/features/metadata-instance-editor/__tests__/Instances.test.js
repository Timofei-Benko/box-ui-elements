import React from 'react';
import Instances from '../Instances'; // Templates

var template1 = {
  id: 'template1',
  templateKey: 'template1',
  displayName: 'template1 title',
  fields: [{
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
  }]
};
var template2 = {
  id: 'template2',
  templateKey: 'template2',
  displayName: 'template2 title',
  fields: [{
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
  }]
}; // Instances with templates metadata

var editor1 = {
  instance: {
    canEdit: true,
    id: 'editor1',
    data: {
      stringfield: 'some string',
      floatfield: 1,
      enumfield: 'yes',
      datefield: '2018-06-20T00:00:00.000Z'
    }
  },
  template: template1
};
var editor2 = {
  instance: {
    canEdit: false,
    id: 'editor2',
    data: {
      stringfield: 'some string',
      floatfield: 1,
      enumfield: 'yes',
      datefield: '2018-06-20T00:00:00.000Z'
    }
  },
  template: template2,
  isDirty: true
}; // State of editors from server

var editorsOnServer = [editor1, editor2];
describe('features/metadata-editor-editor/Instances', function () {
  test('should correctly render editors', function () {
    var wrapper = shallow(React.createElement(Instances, {
      editors: editorsOnServer
    }));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render instances with editors and a selected template', function () {
    var wrapper = shallow(React.createElement(Instances, {
      editors: editorsOnServer,
      selectedTemplateKey: "template1"
    }));
    var selectedTemplate = wrapper.find('Instance').at(0);
    expect(selectedTemplate.prop('isOpen')).toBe(true);
    expect(selectedTemplate.prop('id')).toBe('editor1');
  });
  test('should correctly render instances with a selected template and multiple editors', function () {
    var wrapper = shallow(React.createElement(Instances, {
      editors: editorsOnServer,
      selectedTemplateKey: "template2"
    }));
    var selectedTemplate = wrapper.find('Instance').at(1);
    expect(selectedTemplate.prop('isOpen')).toBe(true);
    expect(selectedTemplate.prop('id')).toBe('editor2');
    var unselectedTemplate = wrapper.find('Instance').at(0);
    expect(unselectedTemplate.prop('isOpen')).toBe(false);
    expect(unselectedTemplate.prop('id')).toBe('editor1');
  });
});