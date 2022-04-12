import { hasSkills, isValidSkillsCard } from '../skillUtils';
describe('elements/content-sidebar/skillUtils', function () {
  describe('isValidSkillsCard()', function () {
    test('should return false when no box skills cards', function () {
      expect(isValidSkillsCard({}, {})).toBeFalsy();
    });
    test('should return true when box skills cards empty', function () {
      expect(isValidSkillsCard({}, {
        entries: []
      })).toBeTruthy();
    });
    test('should return true when file version doesnt exist on skills', function () {
      expect(isValidSkillsCard({
        file_version: {
          id: 'fvid'
        }
      }, {
        entries: []
      })).toBeTruthy();
    });
    test('should return false when file version doesnt match with skills', function () {
      expect(isValidSkillsCard({
        file_version: {
          id: 'fvid'
        }
      }, {
        file_version: {},
        entries: []
      })).toBeFalsy();
    });
    test('should return true when file version matches with skills', function () {
      expect(isValidSkillsCard({
        file_version: {
          id: 'fvid'
        }
      }, {
        file_version: {
          id: 'fvid'
        },
        entries: []
      })).toBeTruthy();
    });
  });
  describe('hasSkills()', function () {
    test('should return false when no file', function () {
      expect(hasSkills()).toBeFalsy();
    });
    test('should return false when no metadata', function () {
      expect(hasSkills({})).toBeFalsy();
    });
    test('should return false when no global metadata', function () {
      expect(hasSkills({
        metadata: {}
      })).toBeFalsy();
    });
    test('should return false when no global metadata box skills template', function () {
      expect(hasSkills({
        metadata: {
          global: {}
        }
      })).toBeFalsy();
    });
    test('should return false when no box skills cards', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {}
          }
        }
      })).toBeFalsy();
    });
    test('should return false when box skills cards empty', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: []
            }
          }
        }
      })).toBeFalsy();
    });
    test('should return true when box skills cards entries empty', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: [{
                entries: []
              }]
            }
          }
        }
      })).toBeTruthy();
    });
    test('should return true when box skills cards has status error', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: [{
                status: 'error'
              }]
            }
          }
        }
      })).toBeTruthy();
    });
    test('should return true when box skills cards entries have data', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: [{
                entries: [{}]
              }]
            }
          }
        }
      })).toBeTruthy();
    });
    test('should return true when even one box skills cards entries have data', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: [{
                entries: []
              }, {
                entries: [{}]
              }]
            }
          }
        }
      })).toBeTruthy();
    });
    test('should return true when even one box skills cards entries has error', function () {
      expect(hasSkills({
        metadata: {
          global: {
            boxSkillsCards: {
              cards: [{
                entries: []
              }, {
                error: {}
              }]
            }
          }
        }
      })).toBeTruthy();
    });
  });
});