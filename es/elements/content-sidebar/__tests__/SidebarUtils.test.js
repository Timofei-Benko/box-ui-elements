import noop from 'lodash/noop';
import * as performance from '../../../utils/performance';
import SidebarUtils from '../SidebarUtils';
import * as skillUtils from '../skills/skillUtils';
import { SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_ACTIVITY, SIDEBAR_VIEW_METADATA, SIDEBAR_VIEW_DETAILS } from '../../../constants';
jest.mock('../../common/async-load', function () {
  return function () {
    return 'LoadableComponent';
  };
});
jest.mock('../SidebarLoadingError', function () {
  return 'sidebar-loading-error';
});
describe('elements/content-sidebar/SidebarUtil', function () {
  describe('canHaveSidebar()', function () {
    test('should return false when nothing is wanted in the sidebar', function () {
      expect(SidebarUtils.canHaveSidebar({})).toBeFalsy();
    });
    test('should return true when skills should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        hasSkills: true
      })).toBeTruthy();
    });
    test('should return true when properties should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        detailsSidebarProps: {
          hasProperties: true
        }
      })).toBeTruthy();
    });
    test('should return true when access stats should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        detailsSidebarProps: {
          hasAccessStats: true
        }
      })).toBeTruthy();
    });
    test('should return true when metadata should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        hasMetadata: true
      })).toBeTruthy();
    });
    test('should return true when classification should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        detailsSidebarProps: {
          hasClassification: true
        }
      })).toBeTruthy();
    });
    test('should return true when activity feed should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        hasActivityFeed: true
      })).toBeTruthy();
    });
    test('should return true when notices should render', function () {
      expect(SidebarUtils.canHaveSidebar({
        detailsSidebarProps: {
          hasNotices: true
        }
      })).toBeTruthy();
    });
  });
  describe('canHaveDetailsSidebar()', function () {
    test('should return false when nothing is wanted in the details sidebar', function () {
      expect(SidebarUtils.canHaveDetailsSidebar({})).toBeFalsy();
    });
    test('should return true when properties should render', function () {
      expect(SidebarUtils.canHaveDetailsSidebar({
        detailsSidebarProps: {
          hasProperties: true
        }
      })).toBeTruthy();
    });
    test('should return true when access stats should render', function () {
      expect(SidebarUtils.canHaveDetailsSidebar({
        detailsSidebarProps: {
          hasAccessStats: true
        }
      })).toBeTruthy();
    });
    test('should return true when classification should render', function () {
      expect(SidebarUtils.canHaveDetailsSidebar({
        detailsSidebarProps: {
          hasClassification: true
        }
      })).toBeTruthy();
    });
    test('should return true when notices should render', function () {
      expect(SidebarUtils.canHaveDetailsSidebar({
        detailsSidebarProps: {
          hasNotices: true
        }
      })).toBeTruthy();
    });
  });
  describe('shouldRenderSkillsSidebar()', function () {
    test('should return false when nothing is wanted in the skills sidebar', function () {
      expect(SidebarUtils.shouldRenderSkillsSidebar({})).toBeFalsy();
    });
    test('should return false when no file', function () {
      expect(SidebarUtils.shouldRenderSkillsSidebar({
        hasSkills: true
      })).toBeFalsy();
    });
    test('should return false when hasSkills is false', function () {
      expect(SidebarUtils.shouldRenderSkillsSidebar({
        hasSkills: false
      }, {})).toBeFalsy();
    });
    test('should return false when no skill data', function () {
      skillUtils.hasSkills = jest.fn().mockReturnValueOnce(false);
      expect(SidebarUtils.shouldRenderSkillsSidebar({
        hasSkills: true
      }, 'file')).toBeFalsy();
      expect(skillUtils.hasSkills).toHaveBeenCalledWith('file');
    });
    test('should return true when hasSkills is true and there is skills data', function () {
      skillUtils.hasSkills = jest.fn().mockReturnValueOnce(true);
      expect(SidebarUtils.shouldRenderSkillsSidebar({
        hasSkills: true
      }, 'file')).toBeTruthy();
      expect(skillUtils.hasSkills).toHaveBeenCalledWith('file');
    });
  });
  describe('canHaveActivitySidebar()', function () {
    test('should return false when hasActivityFeed is false', function () {
      expect(SidebarUtils.canHaveActivitySidebar({
        hasActivityFeed: false
      })).toBeFalsy();
    });
    test('should return true when hasActivityFeed is true', function () {
      expect(SidebarUtils.canHaveActivitySidebar({
        hasActivityFeed: true
      }, {})).toBeTruthy();
    });
  });
  describe('canHaveMetadataSidebar()', function () {
    test('should return false when hasMetadata is false', function () {
      expect(SidebarUtils.canHaveMetadataSidebar({
        hasMetadata: false
      })).toBeFalsy();
    });
    test('should return true when hasMetadata is true', function () {
      expect(SidebarUtils.canHaveMetadataSidebar({
        hasMetadata: true
      }, {})).toBeTruthy();
    });
  });
  describe('shouldRenderMetadataSidebar()', function () {
    test('should return false when nothing is wanted in the metadata sidebar', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({})).toBeFalsy();
    });
    test('should return false when nothing is wanted in the metadata sidebar', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: false
      })).toBeFalsy();
    });
    test('should return true by default when we dont know availability of metadata feature', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: true
      })).toBeTruthy();
    });
    test('should return false when hasMetadata is false', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: false
      }, ['foo'])).toBeFalsy();
    });
    test('should return false when hasMetadata is false', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: false,
        metadataSidebarProps: {
          isFeatureEnabled: true
        }
      }, ['foo'])).toBeFalsy();
    });
    test('should return false when no metadata and no feature', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: true,
        metadataSidebarProps: {
          isFeatureEnabled: false
        }
      }, [])).toBeFalsy();
    });
    test('should return true when no metadata and feature enabled', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: true,
        metadataSidebarProps: {
          isFeatureEnabled: true
        }
      }, [])).toBeTruthy();
    });
    test('should return true when metadata and feature is not enabled', function () {
      expect(SidebarUtils.shouldRenderMetadataSidebar({
        hasMetadata: true,
        metadataSidebarProps: {
          isFeatureEnabled: false
        }
      }, ['foo'])).toBeTruthy();
    });
  });
  describe('shouldRenderSidebar()', function () {
    test('should return false when nothing is wanted in the sidebar', function () {
      expect(SidebarUtils.shouldRenderSidebar({})).toBeFalsy();
    });
    test('should return false when no file', function () {
      expect(SidebarUtils.shouldRenderSidebar({
        hasSkills: true
      })).toBeFalsy();
    });
    test('should return true when we can render details sidebar', function () {
      SidebarUtils.canHaveDetailsSidebar = jest.fn().mockReturnValueOnce(true);
      SidebarUtils.shouldRenderSkillsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.canHaveActivitySidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderMetadataSidebar = jest.fn().mockReturnValueOnce(false);
      expect(SidebarUtils.shouldRenderSidebar('props', 'file')).toBeTruthy();
      expect(SidebarUtils.canHaveDetailsSidebar).toHaveBeenCalledWith('props');
    });
    test('should return true when we can render metadata sidebar', function () {
      SidebarUtils.canHaveDetailsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderSkillsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.canHaveActivitySidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderMetadataSidebar = jest.fn().mockReturnValueOnce(true);
      expect(SidebarUtils.shouldRenderSidebar('props', 'file', 'editors')).toBeTruthy();
      expect(SidebarUtils.shouldRenderMetadataSidebar).toHaveBeenCalledWith('props', 'editors');
    });
    test('should return true when we can render activity sidebar', function () {
      SidebarUtils.canHaveDetailsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderSkillsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.canHaveActivitySidebar = jest.fn().mockReturnValueOnce(true);
      SidebarUtils.shouldRenderMetadataSidebar = jest.fn().mockReturnValueOnce(false);
      expect(SidebarUtils.shouldRenderSidebar('props', 'file')).toBeTruthy();
      expect(SidebarUtils.canHaveActivitySidebar).toHaveBeenCalledWith('props');
    });
    test('should return true when we can render skills sidebar', function () {
      SidebarUtils.canHaveDetailsSidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderSkillsSidebar = jest.fn().mockReturnValueOnce(true);
      SidebarUtils.canHaveActivitySidebar = jest.fn().mockReturnValueOnce(false);
      SidebarUtils.shouldRenderMetadataSidebar = jest.fn().mockReturnValueOnce(false);
      expect(SidebarUtils.shouldRenderSidebar('props', 'file')).toBeTruthy();
      expect(SidebarUtils.shouldRenderSkillsSidebar).toHaveBeenCalledWith('props', 'file');
    });
  });
  describe('getTitleForView()', function () {
    test.each([SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_METADATA, SIDEBAR_VIEW_ACTIVITY])('should return the title for %s', function (view) {
      var title = SidebarUtils.getTitleForView(view);
      expect(title).toMatchSnapshot();
    });
    test('should return null if invalid view', function () {
      var title = SidebarUtils.getTitleForView('foo');
      expect(title).toBe(null);
    });
  });
  describe('getLoaderForView()', function () {
    var MARK_NAME = 'foo_mark';
    beforeEach(function () {
      jest.spyOn(performance, 'mark').mockImplementation(noop);
    });
    test.each([SIDEBAR_VIEW_SKILLS, SIDEBAR_VIEW_DETAILS, SIDEBAR_VIEW_METADATA, SIDEBAR_VIEW_ACTIVITY, 'foo'])('should return the loader for %s', function (view) {
      var loader = SidebarUtils.getLoaderForView(view, MARK_NAME);
      expect(performance.mark).toHaveBeenCalledWith(MARK_NAME);
      expect(loader).toBeInstanceOf(Promise);
    });
  });
  describe('getAsyncSidebarContent()', function () {
    beforeEach(function () {
      jest.spyOn(SidebarUtils, 'getTitleForView').mockReturnValue('foo');
    });
    test('should return the async component', function () {
      var asyncComponent = SidebarUtils.getAsyncSidebarContent('foo_view', 'foo_mark');
      expect(asyncComponent).toMatchSnapshot();
    });
    test('should mix in additional props', function () {
      var asyncComponent = SidebarUtils.getAsyncSidebarContent('foo_view', 'foo_mark', {
        foo: 'bar',
        errorComponent: null
      });
      expect(asyncComponent).toMatchSnapshot();
    });
  });
});