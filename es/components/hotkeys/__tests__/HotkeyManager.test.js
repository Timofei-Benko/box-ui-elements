import HotkeyManager from '../HotkeyManager';
describe('components/hotkeys/HotkeyManager', function () {
  describe('setActiveLayer()', function () {
    test('should add layer to stack', function () {
      HotkeyManager.setActiveLayer(123);
      expect(HotkeyManager.layerStack[0]).toBe(123);
    });
  });
  describe('removeLayer()', function () {
    test('should remove layer from stack', function () {
      HotkeyManager.layerStack = [123, 456, 789];
      HotkeyManager.removeLayer(456);
      expect(HotkeyManager.layerStack).toEqual([123, 789]);
    });
  });
  describe('getActiveLayerID()', function () {
    test('should return layer on the top of the stack', function () {
      HotkeyManager.layerStack = [123, 456, 789];
      expect(HotkeyManager.getActiveLayerID()).toBe(789);
    });
  });
});