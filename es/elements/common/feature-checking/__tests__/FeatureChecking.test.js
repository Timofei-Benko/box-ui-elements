import * as React from 'react';
import { mount } from 'enzyme';
import { isFeatureEnabled, FeatureProvider, FeatureFlag } from '..';
describe('isFeatureEnabled', function () {
  test('returns feature object if key is truthy', function () {
    var features = {
      isEnabled: {
        someProperty: 'sdafas'
      },
      isDisabled: false
    };
    expect(isFeatureEnabled(features, 'isEnabled')).toBe(true);
    expect(isFeatureEnabled(features, 'isDisabled')).toBe(false);
  });
  test('defaults to false', function () {
    var features = {};
    expect(isFeatureEnabled(features, 'unknownKey')).toBe(false);
  });
});
describe('FeatureFlag', function () {
  test('renders children if target feature is enabled', function () {
    var MockChild = jest.fn(function (_ref) {
      var children = _ref.children;
      return children;
    });
    var foo = true;
    var wrapper = mount(React.createElement(FeatureProvider, {
      features: {
        foo: foo
      }
    }, React.createElement("div", null, React.createElement(FeatureFlag, {
      feature: "foo"
    }, React.createElement(MockChild, null, "Foo")))));
    expect(wrapper.html()).toMatchInlineSnapshot("\"<div>Foo</div>\"");
    expect(MockChild).toHaveBeenCalled();
  });
  test('does not render children if target feature is disabled', function () {
    var MockChild = jest.fn(function (_ref2) {
      var children = _ref2.children;
      return children;
    });
    var bar = false;
    var wrapper = mount(React.createElement(FeatureProvider, {
      features: {
        bar: bar
      }
    }, React.createElement(FeatureFlag, {
      feature: "bar"
    }, React.createElement(MockChild, null, "Bar"))));
    expect(wrapper.html()).toBe('');
    expect(MockChild).not.toHaveBeenCalled();
  });
  test('calls enabled/disabled props', function () {
    var enabledFn = jest.fn(function () {
      return null;
    });
    var disabledFn = jest.fn(function () {
      return null;
    });
    var foo = {
      otherProp: 'foo'
    };
    var bar = false;
    mount(React.createElement(FeatureProvider, {
      features: {
        foo: foo,
        bar: bar
      }
    }, React.createElement(FeatureFlag, {
      disabled: disabledFn,
      enabled: enabledFn,
      feature: "foo"
    }), React.createElement(FeatureFlag, {
      disabled: disabledFn,
      enabled: enabledFn,
      feature: "bar"
    })));
    expect(enabledFn).toHaveBeenCalledWith(foo);
    expect(disabledFn).toHaveBeenCalled();
  });
  test('"not" prop inverts flag with children prop', function () {
    var FeatEnabled = jest.fn(function () {
      return null;
    });
    var FeatEnabledNot = jest.fn(function () {
      return null;
    });
    var FeatDisabledNot = jest.fn(function () {
      return null;
    });
    mount(React.createElement(FeatureProvider, {
      features: {
        foo: true,
        bar: false
      }
    }, React.createElement(FeatureFlag, {
      feature: "foo"
    }, React.createElement(FeatEnabled, null)), React.createElement(FeatureFlag, {
      not: true,
      feature: "foo"
    }, React.createElement(FeatEnabledNot, null)), React.createElement(FeatureFlag, {
      not: true,
      feature: "bar"
    }, React.createElement(FeatDisabledNot, null))));
    expect(FeatEnabled).toHaveBeenCalled();
    expect(FeatEnabledNot).not.toHaveBeenCalled();
    expect(FeatDisabledNot).toHaveBeenCalled();
  });
  test('"not" prop inverts flag with enabled/disabled', function () {
    // NOTE: "not" is recommended for use with a single child, not "enabled"/"disabled"
    var enabledFn = jest.fn(function () {
      return null;
    });
    var disabledFn = jest.fn(function () {
      return null;
    });
    var foo = {
      otherProp: 'foo'
    };
    mount(React.createElement(FeatureProvider, {
      features: {
        foo: foo
      }
    }, React.createElement(FeatureFlag, {
      disabled: disabledFn,
      enabled: enabledFn,
      not: true,
      feature: "foo"
    })));
    expect(disabledFn).toHaveBeenCalled();
    expect(enabledFn).not.toHaveBeenCalled();
  });
  test('uses children prop instead of enabled prop if both are provided', function () {
    var MockChild = jest.fn(function () {
      return null;
    });
    var enabledFn = jest.fn(function () {
      return null;
    });
    var foo = {
      otherProp: 'foo is enabled'
    };
    mount(React.createElement(FeatureProvider, {
      features: {
        foo: foo
      }
    }, React.createElement(FeatureFlag, {
      enabled: enabledFn,
      feature: "foo"
    }, React.createElement(MockChild, null))));
    expect(MockChild).toHaveBeenCalled();
    expect(enabledFn).not.toHaveBeenCalled();
  });
  test('defaults to rendering nothing', function () {
    var foo = undefined;
    var bar = {
      enabled: true
    };
    var features = {
      foo: foo,
      bar: bar
    };
    var containerWithinProvider = mount(React.createElement("div", null, React.createElement(FeatureProvider, {
      features: features
    }, React.createElement(FeatureFlag, {
      feature: "foo"
    }), React.createElement(FeatureFlag, {
      feature: "bar"
    }))));
    expect(containerWithinProvider.html()).toMatchInlineSnapshot("\"<div></div>\"");
    var containerWithoutFeatureConfig = mount(React.createElement("div", null, React.createElement(FeatureProvider, null, React.createElement(FeatureFlag, {
      feature: "foo"
    }), React.createElement(FeatureFlag, {
      feature: "bar"
    }))));
    expect(containerWithoutFeatureConfig.html()).toMatchInlineSnapshot("\"<div></div>\"");
    var containerWithoutProvider = mount(React.createElement("div", null, React.createElement(FeatureFlag, {
      feature: "foo"
    }), React.createElement(FeatureFlag, {
      feature: "bar"
    })));
    expect(containerWithoutProvider.html()).toMatchInlineSnapshot("\"<div></div>\"");
  });
});