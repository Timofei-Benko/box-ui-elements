import { formatUser } from '../FormattedUser';
import lastModifiedByCellRenderer from '../lastModifiedByCellRenderer';
jest.mock('../FormattedUser', function () {
  return {
    formatUser: jest.fn().mockImplementation(function (_ref) {
      var id = _ref.id,
          name = _ref.name,
          email = _ref.email;
      return "".concat(id, "-").concat(name, "-").concat(email);
    })
  };
});
describe('features/virtualized-table-renderers/lastModifiedByCellRenderer', function () {
  var cellRendererParams;
  var intl;
  beforeEach(function () {
    cellRendererParams = {
      cellData: {
        modified_at: '2019-07-18T13:45:09-07:00',
        modified_by: {
          id: '123',
          email: 'a@a.com',
          name: 'Rando',
          login: 'a@a.com'
        }
      }
    };
    intl = {
      formatDate: jest.fn().mockImplementation(function (value) {
        return value;
      }),
      formatRelative: jest.fn().mockImplementation(function (value) {
        return "".concat(value, " eons ago");
      }),
      formatMessage: jest.fn().mockImplementation(function (message, _ref2) {
        var lastModified = _ref2.lastModified,
            user = _ref2.user;
        return "".concat(lastModified, " by ").concat(user);
      })
    };
  });
  afterEach(function () {
    jest.clearAllMocks();
  });
  test('should render a dash when cellData is missing', function () {
    cellRendererParams.cellData = null;
    expect(lastModifiedByCellRenderer(intl)(cellRendererParams)).toBe('--');
  });
  test('should render a LastModifiedByCell', function () {
    expect(lastModifiedByCellRenderer(intl)(cellRendererParams)).toMatchSnapshot();
  });
  test('should call support functions with appropriate values', function () {
    var _cellRendererParams = cellRendererParams,
        cellData = _cellRendererParams.cellData;
    var modified_at = cellData.modified_at,
        modified_by = cellData.modified_by;
    var id = modified_by.id,
        email = modified_by.email,
        name = modified_by.name;
    lastModifiedByCellRenderer(intl)(cellRendererParams);
    expect(formatUser).toHaveBeenCalledTimes(1);
    expect(formatUser).toHaveBeenCalledWith({
      id: id,
      email: email,
      name: name
    }, intl);
    expect(intl.formatRelative).toHaveBeenCalledTimes(1);
    expect(intl.formatRelative).toHaveBeenCalledWith(Date.parse(modified_at), {
      units: 'day-short',
      style: 'numeric'
    });
    expect(intl.formatMessage).toHaveBeenCalledTimes(1);
    expect(intl.formatMessage).toHaveBeenCalledWith(expect.any(Object), {
      lastModified: "".concat(Date.parse(modified_at), " eons ago"),
      user: "".concat(id, "-").concat(name, "-").concat(email)
    });
  });
  test('should call formatTargetUser with login when email is empty', function () {
    var _cellRendererParams2 = cellRendererParams,
        cellData = _cellRendererParams2.cellData;
    var modified_by = cellData.modified_by;
    modified_by.email = '';
    modified_by.login = 'log@in.com';
    var _cellData$modified_by = cellData.modified_by,
        id = _cellData$modified_by.id,
        login = _cellData$modified_by.login,
        name = _cellData$modified_by.name;
    lastModifiedByCellRenderer(intl)(cellRendererParams);
    expect(formatUser).toHaveBeenCalledTimes(1);
    expect(formatUser).toHaveBeenCalledWith({
      id: id,
      email: login,
      name: name
    }, intl);
  });
  test('should return only date component when modified_by is missing', function () {
    var _cellRendererParams3 = cellRendererParams,
        cellData = _cellRendererParams3.cellData;
    var modified_at = cellData.modified_at;
    delete cellData.modified_by;
    var result = lastModifiedByCellRenderer(intl)(cellRendererParams);
    expect(formatUser).toHaveBeenCalledTimes(0);
    expect(intl.formatMessage).toHaveBeenCalledTimes(0);
    expect(result).toBe("".concat(Date.parse(modified_at), " eons ago"));
  });
  test('should call formatDate when dateFormat is provided', function () {
    var _cellRendererParams4 = cellRendererParams,
        cellData = _cellRendererParams4.cellData;
    var modified_at = cellData.modified_at;
    var dateFormat = {
      foo: 'bar'
    };
    lastModifiedByCellRenderer(intl, {
      dateFormat: dateFormat
    })(cellRendererParams);
    expect(intl.formatDate).toHaveBeenCalledTimes(1);
    expect(intl.formatDate).toHaveBeenCalledWith(modified_at, dateFormat);
    expect(intl.formatRelative).toHaveBeenCalledTimes(0);
  });
});