import defaultNavLinkRenderer from '../defaultNavLinkRenderer';
describe('feature/left-sidebar/defaultNavLinkRenderer', function () {
  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(defaultNavLinkRenderer(props));
  };

  test('should render default NavLink comoponent', function () {
    var wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});