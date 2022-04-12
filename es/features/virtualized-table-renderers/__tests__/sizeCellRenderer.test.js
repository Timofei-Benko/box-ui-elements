import getSize from '../../../utils/size';
import sizeCellRenderer from '../sizeCellRenderer';
import { DEFAULT_MULTIPLIER } from '../constants';
jest.mock('../../../utils/size');
describe('features/virtualized-table-renderers/sizeCellRenderer', function () {
  var cellRendererParams;
  beforeEach(function () {
    cellRendererParams = {
      cellData: 2000
    };
    getSize.mockImplementation(function (value) {
      return "".concat(value, " petaflops");
    });
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  test('should render a dash when cellData is missing', function () {
    cellRendererParams.cellData = null;
    expect(sizeCellRenderer()(cellRendererParams)).toBe('--');
  });
  test('should render a sizeCell', function () {
    expect(sizeCellRenderer()(cellRendererParams)).toMatchSnapshot();
  });
  test('should set default multiplier when not provided', function () {
    cellRendererParams.cellData = 1;
    sizeCellRenderer()(cellRendererParams);
    expect(getSize).toHaveBeenCalledTimes(1);
    expect(getSize).toHaveBeenCalledWith(1 * DEFAULT_MULTIPLIER);
  });
  test('should call getSize with provided multiplier', function () {
    cellRendererParams.cellData = 1;
    sizeCellRenderer(200)(cellRendererParams);
    expect(getSize).toHaveBeenLastCalledWith(1 * 200);
    expect(getSize).toHaveBeenCalledTimes(1);
    sizeCellRenderer(500)(cellRendererParams);
    expect(getSize).toHaveBeenLastCalledWith(1 * 500);
    expect(getSize).toHaveBeenCalledTimes(2);
  });
  test('should call getSize with numeric equivalent of cellData', function () {
    cellRendererParams.cellData = '123';
    sizeCellRenderer(DEFAULT_MULTIPLIER)(cellRendererParams);
    expect(getSize).toHaveBeenCalledWith(123 * DEFAULT_MULTIPLIER);
    expect(getSize).toHaveBeenCalledTimes(1);
  });
});