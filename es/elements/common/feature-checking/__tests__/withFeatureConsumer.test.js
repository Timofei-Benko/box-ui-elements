import * as React from 'react';
import { mount } from 'enzyme';
import { withFeatureConsumer, FeatureProvider } from '..';
describe('withFeatureConsumer HOC', function () {
  test('wraps component with FeatureConsumer', function () {
    var MyComponent = function MyComponent() {
      return React.createElement("div", null);
    };

    var featureProp = {
      myFeature: true
    };
    var WrappedComponent = withFeatureConsumer(MyComponent);
    var container = mount(React.createElement(FeatureProvider, {
      features: featureProp
    }, React.createElement(WrappedComponent, null)));
    expect(container.find('MyComponent').props().features).toEqual(featureProp);
  });
});