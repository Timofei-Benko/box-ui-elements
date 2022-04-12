import * as React from 'react';
import { shallow } from 'enzyme';
import Transcript from '../Transcript';
describe('elements/content-sidebar/Skills/Transcript/Transcript', function () {
  test('should correctly render read only Transcript when not editable', function () {
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
    var wrapper = shallow(React.createElement(Transcript, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render expand button', function () {
    var props = {
      card: {
        duration: 100,
        entries: [{
          text: 'foo'
        }, {
          text: 'bar'
        }, {
          text: 'bar1'
        }, {
          text: 'bar2'
        }, {
          text: 'bar3'
        }, {
          text: 'bar4'
        }]
      },
      transcript: {
        duration: 100
      },
      isEditable: true,
      onSkillChange: jest.fn()
    };
    var wrapper = shallow(React.createElement(Transcript, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render error mask when no Transcript', function () {
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
    var wrapper = shallow(React.createElement(Transcript, props));
    expect(wrapper).toMatchSnapshot();
  });
  test('should correctly render editable Transcript when editable and editmode', function () {
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
    var wrapper = shallow(React.createElement(Transcript, props));
    wrapper.setState({
      isEditing: true
    });
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
    var wrapper = shallow(React.createElement(Transcript, props));
    wrapper.setState({
      isLoading: true
    });
    expect(wrapper).toMatchSnapshot();
  });
  describe('Component Lifecycle', function () {
    test('componentDidUpdate()', function () {
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
      var wrapper = shallow(React.createElement(Transcript, props));
      wrapper.setState({
        newTranscriptText: 'lorem ipsum dolar'
      });
      wrapper.setProps({
        isEditable: false
      });
      expect(wrapper.state('newTranscriptText')).toEqual('');
    });
  });
});