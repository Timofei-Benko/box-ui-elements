import React from 'react';
import { shallow } from 'enzyme';
import PreviewError from '../PreviewError';
import { ERROR_CODE_FETCH_FILE_DUE_TO_POLICY } from '../../../constants';

var getWrapper = function getWrapper(props) {
  return shallow(React.createElement(PreviewError, props));
};

describe('elements/content-preview/PreviewError', function () {
  describe('render()', function () {
    test('should render correctly', function () {
      var wrapper = getWrapper();
      expect(wrapper).toMatchSnapshot();
    });
    test('should render correctly when blocked by access policy', function () {
      var wrapper = getWrapper({
        errorCode: ERROR_CODE_FETCH_FILE_DUE_TO_POLICY
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});