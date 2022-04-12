import * as React from 'react';
import { shallow } from 'enzyme';
import ReadOnlyKeywords from '../ReadOnlyKeywords';
describe('elements/content-sidebar/Skills/Keywords/ReadOnlyKeywords', function () {
  test('should correctly render with no keyword selected', function () {
    var props = {
      keywords: [{
        text: 'foo',
        appears: [{
          start: 1
        }]
      }, {
        text: 'bar',
        appears: [{
          start: 5
        }]
      }]
    };
    var wrapper = shallow(React.createElement(ReadOnlyKeywords, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render timeline with keyword selected', function () {
    var props = {
      keywords: [{
        text: 'foo',
        appears: [{
          start: 1
        }]
      }, {
        text: 'bar',
        appears: [{
          start: 5
        }]
      }]
    };
    var wrapper = shallow(React.createElement(ReadOnlyKeywords, props));
    wrapper.setState({
      selected: {
        text: 'foo',
        value: 1
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});