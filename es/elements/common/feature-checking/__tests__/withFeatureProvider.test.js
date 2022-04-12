function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import * as React from 'react';
import { mount } from 'enzyme';
import { withFeatureProvider } from '..';
describe('withFeatureProvider HOC', function () {
  test('wraps component with FeatureProvider', function () {
    var MyComponent = function MyComponent() {
      return React.createElement("div", null);
    };

    var featureProp = {
      foo: true
    };
    var otherProps = {
      bar: true,
      baz: false
    };
    var WrapperComponent = withFeatureProvider(MyComponent);
    var container = mount(React.createElement(WrapperComponent, _extends({
      features: featureProp
    }, otherProps)));
    expect(container).toMatchInlineSnapshot("\n<ForwardRef(withFeatureProvider(MyComponent))\n  bar={true}\n  baz={false}\n  features={\n    Object {\n      \"foo\": true,\n    }\n  }\n>\n  <FeatureProvider\n    features={\n      Object {\n        \"foo\": true,\n      }\n    }\n  >\n    <MyComponent\n      bar={true}\n      baz={false}\n    >\n      <div />\n    </MyComponent>\n  </FeatureProvider>\n</ForwardRef(withFeatureProvider(MyComponent))>\n");
    expect(container.find('ForwardRef(withFeatureProvider(MyComponent))')).toHaveLength(1);
    expect(container.find('FeatureProvider').props().features).toEqual(featureProp);
    expect(container.find('MyComponent').props()).toEqual(otherProps);
  });
});