import * as React from 'react';
import { shallow } from 'enzyme';
import Keywords from '../Keywords';
describe('elements/content-sidebar/Skills/Keywords/Keywords', function () {
  test('should correctly render read only keywords when not editable', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: false,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render keywords which are added but not the ones removed', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: false,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    wrapper.setState({
      removes: [props.card.entries[0]],
      adds: [{
        text: 'baz'
      }]
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render edit button when editable', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: true,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render editable keywords when editable and editmode', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: true,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    wrapper.setState({
      isEditing: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render error mask when no keywords', function () {
    var props = {
      card: {
        duration: 100,
        entries: []
      },
      transcript: {
        duration: 100
      },
      isEditable: true,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render when isLoading is true', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: true,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Keywords, props));
    wrapper.setState({
      isLoading: true
    });
    expect(wrapper).toMatchSnapshot();
  });
});