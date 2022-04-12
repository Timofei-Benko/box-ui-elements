function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { shallow } from 'enzyme';
import TaskModal from '../TaskModal';
describe('elements/content-sidebar/TaskModal', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(TaskModal, _extends({
      feedbackUrl: "http://example.dentist/",
      onSubmitError: jest.fn(),
      onSubmitSuccess: jest.fn(),
      onModalClose: jest.fn(),
      isTaskFormOpen: true,
      taskFormProps: {
        approverSelectorContacts: null,
        createTask: jest.fn(),
        getAvatarUrl: jest.fn()
      }
    }, props)));
  };

  describe('render', function () {
    test('should render a default component with default props', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test.each([['GENERAL', 'CREATE'], ['GENERAL', 'EDIT'], ['APPROVAL', 'CREATE'], ['APPROVAL', 'EDIT']])('using type %s and mode %s yields the proper modal title', function (taskType, editMode) {
      var wrapper = getWrapper({
        taskType: taskType,
        editMode: editMode
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});