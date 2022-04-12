import React from 'react';
import { shallow } from 'enzyme';
import SidebarSkillsCard from '../SidebarSkillsCard';
import Transcript from '../transcript';
import Keywords from '../keywords';
import Faces from '../faces';
import Status from '../status';
describe('elements/content-sidebar/Skills/SidebarSkillsCard', function () {
  var getWrapper = function getWrapper(props) {
    return shallow(React.createElement(SidebarSkillsCard, props));
  };

  var cardProps;
  beforeEach(function () {
    cardProps = {
      card: {},
      getViewer: jest.fn()
    };
  });
  test('should render keywords component', function () {
    cardProps.card.skill_card_type = 'keyword';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.find(Keywords)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render timelines component', function () {
    cardProps.card.skill_card_type = 'timeline';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.find(Faces)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render face component', function () {
    cardProps.card.skill_card_type = 'face';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.find(Faces)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render transcript component', function () {
    cardProps.card.skill_card_type = 'transcript';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.find(Transcript)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render nothing if invalid type', function () {
    cardProps.card.skill_card_type = 'foo';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.children()).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render an error from the error code', function () {
    cardProps.card.skill_card_type = 'status';
    var wrapper = getWrapper(cardProps);
    expect(wrapper.find(Status)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});