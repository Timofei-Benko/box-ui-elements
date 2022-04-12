import React from 'react';
import ContactDatalistItem from '../ContactDatalistItem';
describe('components/contact-datalist-item/ContactDatalistItem', function () {
  test('should render a DatalistItem with name and subtitle', function () {
    var wrapper = shallow(React.createElement(ContactDatalistItem, {
      name: "name",
      subtitle: "subtitle"
    }));
    expect(wrapper.find('DatalistItem').length).toBe(1);
    expect(wrapper.find('.contact-name').text()).toEqual('name');
    expect(wrapper.find('.contact-sub-name').text()).toEqual('subtitle');
    expect(wrapper.find('Avatar').length).toBe(0);
  });
  test('should not render a subtitle when not provided', function () {
    var wrapper = shallow(React.createElement(ContactDatalistItem, {
      name: "name"
    }));
    expect(wrapper.find('.contact-sub-name').length).toBe(0);
    expect(wrapper.find('Avatar').length).toBe(0);
  });
  describe('avatars with or without image URLs', function () {
    test('should show avatar component when specified', function () {
      var wrapper = shallow(React.createElement(ContactDatalistItem, {
        name: "name",
        showAvatar: true
      }));
      expect(wrapper.find('Avatar').length).toBe(1);
    });
    test('should do nothing when getPillImageUrl returns a rejected Promise', function () {
      var wrapper = shallow(React.createElement(ContactDatalistItem, {
        name: "name",
        id: "123",
        showAvatar: true,
        getPillImageUrl: function getPillImageUrl() {
          return Promise.reject(new Error());
        }
      }));
      expect(wrapper.state('avatarUrl')).toBe(undefined);
      var instance = wrapper.instance();
      instance.componentDidMount();
      setImmediate(function () {
        wrapper.update();
        expect(wrapper.state('avatarUrl')).toBeUndefined();
        expect(wrapper.find('Avatar').length).toBe(1);
        expect(wrapper.find('Avatar').props().avatarUrl).toBeUndefined();
      });
    });
    test.each([[function (contact) {
      return "/test?id=".concat(contact.id);
    }], [function (contact) {
      return Promise.resolve("/test?id=".concat(contact.id));
    }]])('should use the avatar URL when the prop (and show avatar) are provided', function (getContactAvatarUrl) {
      var wrapper = shallow(React.createElement(ContactDatalistItem, {
        name: "name",
        id: "123",
        showAvatar: true,
        getContactAvatarUrl: getContactAvatarUrl
      }));
      expect(wrapper.state('avatarUrl')).toBeUndefined();
      var instance = wrapper.instance();
      instance.componentDidMount();
      setImmediate(function () {
        wrapper.update();
        expect(wrapper.state('avatarUrl')).toBe('/test?id=123');
        expect(wrapper.find('Avatar').length).toBe(1);
        expect(wrapper.find('Avatar').props().avatarUrl).toEqual('/test?id=123');
      });
    });
    test('should not have the avatar URL when the id prop is missing', function () {
      var wrapper = shallow(React.createElement(ContactDatalistItem, {
        name: "name",
        showAvatar: true,
        getContactAvatarUrl: function getContactAvatarUrl(contact) {
          return "/test?id=".concat(contact.id);
        }
      }));
      expect(wrapper.find('Avatar').length).toBe(1);
      expect(wrapper.find('Avatar').props().avatarUrl).toBeUndefined();
    });
  });
});