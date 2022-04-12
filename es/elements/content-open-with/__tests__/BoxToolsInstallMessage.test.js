import React from 'react';
import { shallow } from 'enzyme';
import BoxToolsInstallMessage from '../BoxToolsInstallMessage';
describe('elements/content-open-with/BoxToolsInstallMessage', function () {
  afterEach(function () {
    jest.restoreAllMocks();
  });

  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(BoxToolsInstallMessage, props));
  };

  describe('render', function () {
    it('should render a translated message with a link', function () {
      var wrapper = getWrapper({});
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('render', function () {
    it('should use passed in name and URL if provided', function () {
      var wrapper = getWrapper({
        boxToolsName: 'a local application',
        boxToolsInstallUrl: 'https://foo.com/bar'
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});