function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            versions\n            ", "\n            ", "\n            ", "\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import * as React from 'react';
import { shallow } from 'enzyme/build';
import VersionsList from '../VersionsList';
describe('elements/content-sidebar/versions/VersionsList', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(React.createElement(VersionsList, props));
  };

  describe('render', function () {
    test.each(_templateObject(), [], [{
      id: '12345'
    }], [{
      id: '12345'
    }, {
      id: '45678'
    }])('should match its snapshot', function (_ref) {
      var versions = _ref.versions;
      var match = {
        params: {
          versionId: '12345'
        },
        path: '/versions/:versionId'
      };
      var wrapper = getWrapper({
        match: match,
        versions: versions
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});