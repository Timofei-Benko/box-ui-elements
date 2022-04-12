import { shallow } from 'enzyme';
import PlainButton from '../../../components/plain-button/PlainButton';
import FileIcon from '../../../icons/file-icon';
import itemNameCellRenderer from '../itemNameCellRenderer';
describe('features/virtualized-table-renderers/itemNameCellRenderer', function () {
  var wrapper;
  var cellRendererParams;
  var intl;

  var getWrapper = function getWrapper() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return shallow(itemNameCellRenderer(intl)(props));
  };

  beforeEach(function () {
    cellRendererParams = {
      cellData: {
        name: 'fancy.jpg',
        type: 'file',
        dataAttributes: {
          'data-resin-target': 'file'
        }
      }
    };
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
    cellRendererParams.cellData = null;
    expect(itemNameCellRenderer(intl)(cellRendererParams)).toBe('--');
  });
  test('should render a itemNameCell', function () {
    wrapper = getWrapper(cellRendererParams);
    expect(wrapper).toMatchSnapshot();
  });
  test('should render correct data and a span when type is file', function () {
    wrapper = getWrapper(cellRendererParams);
    var content = wrapper.find('.bdl-ItemNameCell-name');
    expect(content.text()).toBe('fancy.jpg');
    expect(content.props()['data-resin-target']).toBe('file');
    expect(wrapper.find(PlainButton)).toHaveLength(0);
    expect(wrapper.find('span')).toHaveLength(2);
  });
  test('should render a PlainButton when type is folder', function () {
    cellRendererParams.cellData.type = 'folder';
    wrapper = getWrapper(cellRendererParams);
    expect(wrapper.find(PlainButton)).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(1);
  });
  test('should get the extension from the file name and pass it to FileIcon', function () {
    cellRendererParams.cellData.name = 'file.pdf';
    wrapper = getWrapper(cellRendererParams);
    expect(wrapper.find(FileIcon).props().extension).toBe('pdf');
    cellRendererParams.cellData.name = 'file.pdf.boxnote';
    wrapper = getWrapper(cellRendererParams);
    expect(wrapper.find(FileIcon).props().extension).toBe('boxnote');
  });
  test('should render external file name when isExternal is true', function () {
    cellRendererParams.cellData.isExternal = true;
    wrapper = getWrapper(cellRendererParams);
    expect(wrapper.find('.bdl-ItemNameCell-name').text()).toBe('External File');
  });
});