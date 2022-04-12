import React from 'react';
import { shallow } from 'enzyme';
import Status from '../Status';
describe('elements/content-sidebar/Skills/Status', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(Status, props));
  };

  test('should render default status', function () {
    var wrapper = getWrapper({
      card: {}
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render default status with message', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          message: 'error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render file size error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_invalid_file_size_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render file ext error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_invalid_file_format_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render unkown error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_unknown_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render pending status', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_pending_status'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render invoked status', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_invoked_status'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render invocations error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_invocations_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render billing error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_billing_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render external auth error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_external_auth_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render file processing error', function () {
    var wrapper = getWrapper({
      card: {
        status: {
          code: 'skills_file_processing_error'
        }
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});