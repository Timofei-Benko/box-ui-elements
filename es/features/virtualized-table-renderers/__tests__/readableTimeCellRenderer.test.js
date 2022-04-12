import readableTimeCellRenderer from '../readableTimeCellRenderer';
describe('features/virtualized-table-renderers/readableTimeCellRenderer', function () {
  var cellRendererParams;
  beforeEach(function () {
    cellRendererParams = {
      cellData: '2019-07-18T13:45:09-07:00'
    };
  });
  test('should render a DateCell with formatted date', function () {
    expect(readableTimeCellRenderer(cellRendererParams)).toMatchSnapshot();
  });
  test('should render a dash when cellData is missing', function () {
    cellRendererParams.cellData = null;
    expect(readableTimeCellRenderer(cellRendererParams)).toBe('--');
  });
});