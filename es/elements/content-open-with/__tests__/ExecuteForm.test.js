import React from 'react';
import { shallow } from 'enzyme';
import ExecuteForm from '../ExecuteForm';
describe('elements/content-open-with/ExecuteForm', function () {
  afterEach(function () {
    jest.restoreAllMocks();
  });
  var executePostData = {
    url: 'foo.com',
    params: [{
      key: 'foo',
      value: 'bar'
    }, {
      key: 'bar',
      value: 'baz'
    }]
  };
  var submitStub = jest.fn();
  var ref = {
    current: {
      submit: submitStub
    }
  };
  var onSubmitStub = jest.fn();

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(ExecuteForm, props));
  };

  describe('componentDidMount', function () {
    it('should submit the form and call callback on mount', function () {
      React.createRef = jest.fn().mockReturnValue(ref);
      var wrapper = getWrapper({
        executePostData: executePostData,
        onSubmit: onSubmitStub
      });
      var instance = wrapper.instance();
      instance.componentDidMount();
      expect(submitStub).toBeCalled();
      expect(onSubmitStub).toBeCalled();
    });
  });
  it('should render an input for each param', function () {
    var wrapper = getWrapper({
      executePostData: executePostData,
      onSubmit: onSubmitStub
    });
    var instance = wrapper.instance();
    instance.ref = ref;
    expect(wrapper).toMatchSnapshot();
  });
});