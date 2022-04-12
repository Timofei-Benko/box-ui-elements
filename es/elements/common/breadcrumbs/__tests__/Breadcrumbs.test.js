import { shallow } from 'enzyme';
import { BreadcrumbsBase } from '../Breadcrumbs';
describe('Breadcrumbs', function () {
  var intl;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(BreadcrumbsBase(props));
  };

  var allFilesLocalized = 'localizedValue';
  beforeEach(function () {
    intl = {
      formatMessage: jest.fn().mockReturnValue(allFilesLocalized)
    };
  });
  test('should render "All Files" breadcrumb in localized string', function () {
    var crumbs = [{
      id: '0',
      name: 'All Files'
    }];
    var wrapper = getWrapper({
      crumbs: crumbs,
      delimiter: 'caret',
      onCrumbClick: jest.fn(),
      rootId: '123123',
      intl: intl
    });
    var breadCrumb = wrapper.find('Breadcrumb');
    expect(breadCrumb.prop('name')).toBe(allFilesLocalized);
  });
});