import { OrderedSet } from 'immutable';
import sinon from 'sinon';
import Mousetrap from 'mousetrap';
import HotkeyService from '../HotkeyService';
import HotkeyRecord from '../HotkeyRecord';
import HotkeyManager from '../HotkeyManager';
jest.mock('../HotkeyManager', function () {
  return {
    getActiveLayerID: jest.fn(),
    setActiveLayer: jest.fn(),
    removeLayer: jest.fn()
  };
});
jest.mock('mousetrap');
var sandbox = sinon.sandbox.create();
describe('components/hotkeys/HotkeyService', function () {
  var instance;
  var callbackSpy;
  beforeEach(function () {
    callbackSpy = jest.fn();

    var MousetrapMock = function MousetrapMock(el) {
      el.addEventListener('keydown', callbackSpy);
      return {
        bind: sandbox.spy(),
        unbind: sandbox.spy(),
        reset: sandbox.spy()
      };
    };

    Mousetrap.mockImplementation(MousetrapMock);
    instance = new HotkeyService();
  });
  afterEach(function () {
    sandbox.verifyAndRestore();
    jest.resetModules();
    jest.resetAllMocks();
  });
  describe('constructor()', function () {
    test('should instantiate Mousetrap object and set event listener', function () {
      expect(instance.mousetrap).toBeTruthy();
      expect(instance.mousetrapEventHandler).toBeTruthy();
    });
    test('should add event listeners', function () {
      sandbox.mock(window).expects('addEventListener').thrice();
      instance = new HotkeyService();
    });
    test('should set this layer as active layer in hotkey manager', function () {
      expect(HotkeyManager.setActiveLayer).toHaveBeenCalledWith(instance.layerID);
    });
  });
  describe('mousetrapEventHandler()', function () {
    test('should call stopPropagation and callback when this layer is currently active', function () {
      HotkeyManager.getActiveLayerID.mockReturnValueOnce(instance.layerID);
      var stopPropagation = jest.fn();
      instance.mousetrapEventHandler({
        stopPropagation: stopPropagation
      });
      expect(stopPropagation).toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalled();
    });
    test('should immediately return when this layer is not currently active', function () {
      HotkeyManager.getActiveLayerID.mockReturnValueOnce("".concat(instance.layerID, "-not-this-layer"));
      var stopPropagation = jest.fn();
      instance.mousetrapEventHandler({
        stopPropagation: stopPropagation
      });
      expect(stopPropagation).not.toHaveBeenCalled();
    });
  });
  describe('destroyLayer()', function () {
    test('should remove event listeners', function () {
      sandbox.mock(window).expects('removeEventListener').thrice();
      instance.destroyLayer();
    });
    test('should remove layer from hotkey manager', function () {
      instance.destroyLayer();
      expect(HotkeyManager.setActiveLayer).toHaveBeenCalledWith(instance.layerID);
    });
  });
  describe('reset()', function () {
    test('should reset hotkeys and call mousetrap.reset() when called', function () {
      instance.hotkeys = new OrderedSet(['hi', 'hello']);
      instance.reset();
      expect(instance.hotkeys.size).toEqual(0); // called twice bc this.reset() is called in the constructor

      expect(instance.mousetrap.reset.calledTwice).toBe(true);
    });
  });
  describe('getActiveHotkeys()', function () {
    test('should return object with active hotkeys sorted into "buckets" by type', function () {
      var navigationHotkey = new HotkeyRecord({
        key: 'a',
        type: 'navigation'
      });
      var otherHotkey = new HotkeyRecord({
        key: 'b',
        type: 'other'
      });
      var previewHotkey = new HotkeyRecord({
        key: 'c',
        type: 'preview'
      });
      var hotkeys = new OrderedSet([navigationHotkey, otherHotkey, previewHotkey]);
      instance.hotkeys = hotkeys;
      var expected = {
        navigation: [navigationHotkey],
        other: [otherHotkey],
        preview: [previewHotkey]
      };
      expect(instance.getActiveHotkeys()).toEqual(expected);
    });
  });
  describe('getActiveTypes()', function () {
    test('should return a list of the unique types of the currently active hotkeys', function () {
      var navigationHotkey = new HotkeyRecord({
        key: 'a',
        type: 'navigation'
      });
      var otherHotkey = new HotkeyRecord({
        key: 'b',
        type: 'other'
      });
      var previewHotkey = new HotkeyRecord({
        key: 'c',
        type: 'preview'
      });
      var hotkeys = new OrderedSet([navigationHotkey, otherHotkey, previewHotkey, navigationHotkey]);
      instance.hotkeys = hotkeys;
      var expected = ['navigation', 'other', 'preview'];
      expect(instance.getActiveTypes()).toEqual(expected);
    });
  });
  describe('registerHotkey()', function () {
    test('should add hotkey config and call mousetrap.bind', function () {
      var config = new HotkeyRecord({
        key: 'b'
      });
      instance.registerHotkey(config);
      expect(instance.hotkeys.contains(config)).toBe(true);
      expect(instance.mousetrap.bind.calledOnce).toBe(true);
    });
    test('should ignore the request to register if the config was already registered', function () {
      var config = new HotkeyRecord({
        key: 'b'
      });
      instance.registerHotkey(config);
      instance.registerHotkey(config);
      expect(instance.mousetrap.bind.calledOnce).toBe(true);
    });
    test('should throw an exception if a key is already in use by another config', function () {
      var config1 = new HotkeyRecord({
        key: 'b'
      });
      var config2 = new HotkeyRecord({
        key: 'b'
      });
      instance.registerHotkey(config1);
      expect(function () {
        return instance.registerHotkey(config2);
      }).toThrow('This app is trying to bind multiple actions to the hot keys: b');
    });
  });
  describe('deregisterHotkey()', function () {
    var hotkeyConfigA;
    var hotkeyConfigB;
    var hotkeyConfigC;
    beforeEach(function () {
      hotkeyConfigA = new HotkeyRecord({
        key: 'a'
      });
      hotkeyConfigB = new HotkeyRecord({
        key: 'b'
      });
      hotkeyConfigC = new HotkeyRecord({
        key: 'c'
      });
      instance.registerHotkey(hotkeyConfigA);
      instance.registerHotkey(hotkeyConfigB);
      instance.registerHotkey(hotkeyConfigC);
    });
    test('should remove hotkey config when called', function () {
      instance.deregisterHotkey(hotkeyConfigB);
      var _instance = instance,
          hotkeys = _instance.hotkeys;
      expect(hotkeys.size).toEqual(2);
      expect(hotkeys.includes(hotkeyConfigB)).toBe(false);
    });
    test('should report no error if asked to remove a config that is not registered', function () {
      var newConfig = new HotkeyRecord({
        key: 'd'
      });
      expect(function () {
        return instance.deregisterHotkey(newConfig);
      }).not.toThrow();
    });
  });
});