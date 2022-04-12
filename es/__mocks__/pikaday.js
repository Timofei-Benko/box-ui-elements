var setDate = jest.fn();
var Pikaday = jest.fn().mockImplementation(function () {
  return {
    el: document.createElement('div'),
    getDate: function getDate() {},
    gotoDate: function gotoDate() {},
    setDate: setDate,
    setMaxDate: function setMaxDate() {},
    setMinDate: function setMinDate() {},
    isVisible: function isVisible() {
      return false;
    },
    show: function show() {},
    hide: function hide() {},
    destroy: function destroy() {}
  };
});
export { setDate };
export default Pikaday;