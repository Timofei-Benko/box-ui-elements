import omit from 'lodash/omit';
import defaultTheme from '../theme';
import { createTheme } from '../../utils/createTheme';
import * as vars from '../variables';
describe('styles/theme', function () {
  test('should generate box blue theme matching the defaultTheme', function () {
    var dynamicTheme = createTheme(vars.bdlBoxBlue);
    expect(defaultTheme).toMatchObject(omit(dynamicTheme, ['primary', '_debug']));
  });
});