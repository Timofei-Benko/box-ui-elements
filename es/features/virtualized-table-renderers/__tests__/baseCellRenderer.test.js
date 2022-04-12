import baseCellRenderer from '../baseCellRenderer';
describe('features/virtualized-table-renderers/baseCellRenderer', function () {
  var cellRendererParams;
  beforeEach(function () {
    cellRendererParams = {
      cellData: 'cellData'
    };
  });
  test('should return a dash and avoid calling renderValue when cellData is null or undefined or empty', function () {
    var result;
    var renderValue = jest.fn();
    cellRendererParams.cellData = undefined;
    result = baseCellRenderer(cellRendererParams, renderValue);
    expect(result).toBe('--');
    cellRendererParams.cellData = null;
    result = baseCellRenderer(cellRendererParams, renderValue);
    expect(result).toBe('--');
    cellRendererParams.cellData = '';
    result = baseCellRenderer(cellRendererParams, renderValue);
    expect(result).toBe('--');
    expect(renderValue).toHaveBeenCalledTimes(0);
  });
  test('should render string representation of cellData when renderValue is not provided', function () {
    cellRendererParams.cellData = 123;
    expect(baseCellRenderer(cellRendererParams)).toBe('123');
  });
  test('should call renderValue with cellData when value is defined', function () {
    var renderValue = jest.fn();
    cellRendererParams.cellData = 123;
    baseCellRenderer(cellRendererParams, renderValue);
    expect(renderValue).toHaveBeenCalledTimes(1);
    expect(renderValue).toHaveBeenCalledWith(123);
  });
});