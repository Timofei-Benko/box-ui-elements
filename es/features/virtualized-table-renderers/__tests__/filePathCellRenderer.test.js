import { shallow } from 'enzyme';
import filePathCellRenderer from '../filePathCellRenderer';
describe('features/virtualized-table-renderers/filePathCellRenderer', function () {
  var intl;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(filePathCellRenderer(intl)(props));
  };

  beforeEach(function () {
    intl = {
      formatMessage: jest.fn().mockImplementation(function (message) {
        return message.defaultMessage;
      })
    };
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  test('should render a dash when cellData is missing', function () {
    expect(filePathCellRenderer(intl)({
      cellData: null
    })).toBe('--');
  });
  test('should render a FilePathCell when all fields are available', function () {
    var cellData = {
      id: '123',
      name: 'fancy.jpg',
      itemType: 'file',
      itemPath: [{
        id: '123',
        name: 'YouFooMe'
      }, {
        id: '234',
        name: 'CooMooFoo'
      }],
      size: 123
    };
    var wrapper = getWrapper({
      cellData: cellData
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a FilePathCell when only id is available', function () {
    var cellData = {
      id: '123'
    };
    var wrapper = getWrapper({
      cellData: cellData
    });
    expect(wrapper).toMatchSnapshot();
  });
  test('should render a FilePathCell with "All Files" text when given an external file', function () {
    var cellData = {
      id: '123',
      name: 'fancy.jpg',
      itemType: 'file',
      itemPath: [{
        id: '0',
        name: 'YouFooMe'
      }, {
        id: '234',
        name: 'CooMooFoo',
        isExternal: true
      }],
      size: 123,
      isExternal: true
    };
    var wrapper = getWrapper({
      cellData: cellData
    });
    expect(wrapper).toMatchSnapshot();
  });
});