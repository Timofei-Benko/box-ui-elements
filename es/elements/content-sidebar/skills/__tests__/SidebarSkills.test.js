import React from 'react';
import { mount } from 'enzyme';
import SidebarSkills from '../SidebarSkills';
import SidebarSkillsCard from '../SidebarSkillsCard';
jest.mock('../../SidebarSection', function () {
  return 'sidebar-section';
});
jest.mock('../SidebarSkillsCard', function () {
  return 'sidebar-skills-card';
});
describe('elements/content-sidebar/Skills/SidebarSkills', function () {
  var getWrapper = function getWrapper(props) {
    return mount(React.createElement(SidebarSkills, props));
  };

  test('should render the cards when there are valid skills', function () {
    var props = {
      file: {
        permissions: {
          can_upload: true
        }
      },
      errors: {
        3: true,
        5: true
      },
      cards: [{
        skill_card_title: {
          code: 'skills_faces'
        },
        entries: [{}]
      }, {
        skill_card_title: {
          code: 'skills_transcript'
        },
        entries: []
      }, {
        skill_card_title: {
          code: 'skills_topics'
        },
        entries: []
      }, {
        skill_card_title: {
          code: 'skills_status'
        },
        entries: [{}]
      }, {
        skill_card_title: {
          code: 'skills_error'
        },
        entries: []
      }, {
        skill_card_title: {
          message: 'title'
        },
        entries: [{}]
      }],
      getViewer: jest.fn()
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(SidebarSkillsCard)).toHaveLength(6);
  });
  test('should render only the valid cards', function () {
    var props = {
      file: {
        permissions: {
          can_upload: true
        }
      },
      errors: {
        1: true
      },
      cards: [{}, {
        entries: [{
          title: 'bar'
        }]
      }],
      getViewer: jest.fn()
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(SidebarSkillsCard)).toHaveLength(1);
  });
  test('should have no editable permission if can_upload is false', function () {
    var props = {
      file: {
        permissions: {
          can_upload: false
        }
      },
      errors: {},
      cards: [{
        entries: [{
          title: 'bar'
        }]
      }],
      getViewer: jest.fn()
    };
    var wrapper = getWrapper(props);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(SidebarSkillsCard)).toHaveLength(1);
  });
});