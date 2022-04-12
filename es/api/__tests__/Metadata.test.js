function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import Cache from '../../utils/Cache';
import * as ErrorUtil from '../../utils/error';
import Metadata from '../Metadata';
import { METADATA_TEMPLATE_CLASSIFICATION, METADATA_SCOPE_GLOBAL, METADATA_TEMPLATE_PROPERTIES, ERROR_CODE_DELETE_METADATA, ERROR_CODE_CREATE_METADATA, ERROR_CODE_UPDATE_METADATA, ERROR_CODE_UPDATE_SKILLS, ERROR_CODE_FETCH_SKILLS, ERROR_CODE_FETCH_METADATA_TEMPLATES, ERROR_CODE_FETCH_METADATA } from '../../constants';
var metadata;
describe('api/Metadata', function () {
  beforeEach(function () {
    metadata = new Metadata({});
  });
  describe('getCacheKey()', function () {
    test('should return correct key', function () {
      expect(metadata.getCacheKey('foo')).toBe('file_foo');
    });
  });
  describe('getMetadataCacheKey()', function () {
    test('should return correct key', function () {
      expect(metadata.getMetadataCacheKey('foo')).toBe('metadata_foo');
    });
  });
  describe('getSkillsCacheKey()', function () {
    test('should return correct key', function () {
      expect(metadata.getSkillsCacheKey('foo')).toBe('metadata_foo_skills');
    });
  });
  describe('getClassificationCacheKey()', function () {
    test('should return correct key', function () {
      expect(metadata.getClassificationCacheKey('foo')).toBe('metadata_foo_classification');
    });
  });
  describe('getMetadataUrl()', function () {
    test('should return base api url when no template or scope', function () {
      expect(metadata.getMetadataUrl('foo')).toBe('https://api.box.com/2.0/files/foo/metadata');
      expect(metadata.getMetadataUrl('foo', '', 'template')).toBe('https://api.box.com/2.0/files/foo/metadata');
      expect(metadata.getMetadataUrl('foo', 'scope')).toBe('https://api.box.com/2.0/files/foo/metadata');
    });
    test('should return correct api url with scope and template', function () {
      expect(metadata.getMetadataUrl('foo', 'scope', 'template')).toBe('https://api.box.com/2.0/files/foo/metadata/scope/template');
    });
  });
  describe('getMetadataTemplateUrl()', function () {
    test('should return correct base api url', function () {
      expect(metadata.getMetadataTemplateUrl('scope')).toBe('https://api.box.com/2.0/metadata_templates');
    });
  });
  describe('getMetadataTemplateUrlForInstance()', function () {
    test('should return template url for an instance', function () {
      expect(metadata.getMetadataTemplateUrlForInstance('id')).toBe('https://api.box.com/2.0/metadata_templates?metadata_instance_id=id');
    });
  });
  describe('getMetadataTemplateSchemaUrl()', function () {
    test('should return url for to get metadata schema using template key', function () {
      var templateKey = 'templateKey_123';
      expect(metadata.getMetadataTemplateSchemaUrl(templateKey)).toBe("https://api.box.com/2.0/metadata_templates/enterprise/".concat(templateKey, "/schema"));
    });
  });
  describe('getMetadataTemplateUrlForScope()', function () {
    test('should return correct template url for scope', function () {
      expect(metadata.getMetadataTemplateUrlForScope('scope')).toBe('https://api.box.com/2.0/metadata_templates/scope');
    });
  });
  describe('getCustomPropertiesTemplate()', function () {
    test('should return correct properties template', function () {
      expect(metadata.getCustomPropertiesTemplate()).toEqual({
        id: expect.stringContaining('metadata_template_'),
        scope: METADATA_SCOPE_GLOBAL,
        templateKey: METADATA_TEMPLATE_PROPERTIES,
        hidden: false
      });
    });
  });
  describe('createEditor()', function () {
    test('should return an uneditable editor', function () {
      expect(metadata.createEditor({
        $id: 'id',
        $foo: 'bar',
        foo: 'bar',
        $canEdit: true
      }, {
        id: 'foo'
      }, false)).toEqual({
        template: {
          id: 'foo'
        },
        instance: {
          id: 'id',
          canEdit: false,
          data: {
            foo: 'bar'
          }
        }
      });
    });
    test('should return an editable editor', function () {
      expect(metadata.createEditor({
        $id: 'id',
        $foo: 'bar',
        foo: 'bar',
        $canEdit: true
      }, {
        id: 'foo'
      }, true)).toEqual({
        template: {
          id: 'foo'
        },
        instance: {
          id: 'id',
          canEdit: true,
          data: {
            foo: 'bar'
          }
        }
      });
    });
  });
  describe('getTemplates()', function () {
    test('should return templates with enterprise scope',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var templatesFromServer, templates;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              templatesFromServer = [{
                id: 1,
                hidden: false
              }, {
                id: 2,
                hidden: true
              }, {
                id: 3,
                hidden: false
              }, {
                id: 4,
                hidden: false
              }, {
                id: 5,
                hidden: true,
                templateKey: METADATA_TEMPLATE_CLASSIFICATION
              }, {
                id: 6,
                hidden: false,
                templateKey: METADATA_TEMPLATE_CLASSIFICATION
              }];
              metadata.getMetadataTemplateUrlForScope = jest.fn().mockReturnValueOnce('template_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  entries: templatesFromServer
                }
              });
              _context.next = 5;
              return metadata.getTemplates('id', 'enterprise');

            case 5:
              templates = _context.sent;
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA_TEMPLATES);
              expect(templates).toEqual(templates);
              expect(metadata.getMetadataTemplateUrlForScope).toHaveBeenCalledWith('enterprise');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'template_url',
                id: 'file_id',
                params: {
                  limit: 1000
                }
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    test('should return templates scoped to instance id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var templatesFromServer, templates;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              templatesFromServer = [{
                id: 1,
                hidden: false
              }];
              metadata.getMetadataTemplateUrlForInstance = jest.fn().mockReturnValueOnce('template_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  entries: templatesFromServer
                }
              });
              _context2.next = 5;
              return metadata.getTemplates('id', 'scope', 'id');

            case 5:
              templates = _context2.sent;
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA_TEMPLATES);
              expect(templates).toEqual(templates);
              expect(metadata.getMetadataTemplateUrlForInstance).toHaveBeenCalledWith('id');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'template_url',
                id: 'file_id',
                params: {
                  limit: 1000
                }
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    test('should return empty array of templates when error is 400',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var error, templates;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              error = new Error();
              error.status = 400;
              metadata.getMetadataTemplateUrlForScope = jest.fn().mockReturnValueOnce('template_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.reject(error));
              _context3.prev = 4;
              _context3.next = 7;
              return metadata.getTemplates('id', 'scope');

            case 7:
              templates = _context3.sent;
              _context3.next = 13;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](4);
              expect(_context3.t0.status).toEqual(400);

            case 13:
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA_TEMPLATES);
              expect(templates).toEqual([]);
              expect(metadata.getMetadataTemplateUrlForScope).toHaveBeenCalledWith('scope');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'template_url',
                id: 'file_id',
                params: {
                  limit: 1000
                }
              });

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[4, 10]]);
    })));
    test('should throw error when error is not 400',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var error, templates;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              error = new Error();
              error.status = 401;
              metadata.getMetadataTemplateUrlForScope = jest.fn().mockReturnValueOnce('template_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.reject(error));
              _context4.prev = 4;
              _context4.next = 7;
              return metadata.getTemplates('id', 'scope');

            case 7:
              templates = _context4.sent;
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](4);
              expect(_context4.t0.status).toEqual(401);

            case 13:
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA_TEMPLATES);
              expect(templates).toBeUndefined();
              expect(metadata.getMetadataTemplateUrlForScope).toHaveBeenCalledWith('scope');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'template_url',
                id: 'file_id',
                params: {
                  limit: 1000
                }
              });

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[4, 10]]);
    })));
  });
  describe('getSchemaByTemplateKey()', function () {
    test('should return metadata template for provided template key',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var metadataTemplate, templateKey, url, response;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              metadataTemplate = 'metadataTemplate';
              templateKey = 'templateKey_123';
              url = "https://api.box.com/2.0/metadata_templates/enterprise/".concat(templateKey, "/schema");
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.resolve(metadataTemplate));
              _context5.next = 6;
              return metadata.getSchemaByTemplateKey(templateKey);

            case 6:
              response = _context5.sent;
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: url
              });
              expect(response).toBe(metadataTemplate);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
  });
  describe('getInstances()', function () {
    test('should return templates with enterprise scope',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var instancesFromServer, instances;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              instancesFromServer = [{
                id: 1,
                hidden: false
              }, {
                id: 2,
                hidden: true
              }, {
                id: 3,
                hidden: false
              }, {
                id: 4,
                hidden: false
              }];
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('metadata_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  entries: instancesFromServer
                }
              });
              _context6.next = 5;
              return metadata.getInstances('id');

            case 5:
              instances = _context6.sent;
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA);
              expect(instances).toEqual(instances);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith('id');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'metadata_url',
                id: 'file_id'
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    test('should return empty array of templates when error is 400',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var error, instances;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              error = new Error();
              error.status = 400;
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('metadata_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.reject(error));
              _context7.prev = 4;
              _context7.next = 7;
              return metadata.getInstances('id');

            case 7:
              instances = _context7.sent;
              _context7.next = 13;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](4);
              expect(_context7.t0.status).toEqual(400);

            case 13:
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA);
              expect(instances).toEqual([]);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith('id');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'metadata_url',
                id: 'file_id'
              });

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[4, 10]]);
    })));
    test('should throw error when error is not 400',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var error, instances;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              error = new Error();
              error.status = 401;
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('metadata_url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.reject(error));
              _context8.prev = 4;
              _context8.next = 7;
              return metadata.getInstances('id');

            case 7:
              instances = _context8.sent;
              _context8.next = 13;
              break;

            case 10:
              _context8.prev = 10;
              _context8.t0 = _context8["catch"](4);
              expect(_context8.t0.status).toEqual(401);

            case 13:
              expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA);
              expect(instances).toBeUndefined();
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith('id');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'metadata_url',
                id: 'file_id'
              });

            case 17:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[4, 10]]);
    })));
  });
  describe('getUserAddableTemplates()', function () {
    test('should return empty array when metadata feature is off',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var custom, ent, templates;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              custom = 'custom';
              ent = [{
                templateKey: 'e1'
              }, {
                templateKey: 'e2'
              }];
              templates = [].concat(ent, [{
                templateKey: 'securityClassification-6VMVochwUWo'
              }]);
              expect(metadata.getUserAddableTemplates(custom, templates, false)).toEqual([]);

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    test('should return only custom props tempalte when file is externally owned',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var custom, ent, templates;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              custom = 'custom';
              ent = [{
                templateKey: 'e1'
              }, {
                templateKey: 'e2'
              }];
              templates = [].concat(ent, [{
                templateKey: 'securityClassification-6VMVochwUWo'
              }]);
              expect(metadata.getUserAddableTemplates(custom, templates, true, true)).toEqual(['custom']);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    test('should return all templates for file owner minus classification',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var custom, ent, templates;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              custom = 'custom';
              ent = [{
                templateKey: 'e1'
              }, {
                templateKey: 'e2'
              }];
              templates = [].concat(ent, [{
                templateKey: 'securityClassification-6VMVochwUWo'
              }]);
              expect(metadata.getUserAddableTemplates(custom, templates, true)).toEqual(['custom'].concat(ent));

            case 4:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
    test('should return all templates for file owner minus hidden ones',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var custom, ent, templates;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              custom = 'custom';
              ent = [{
                templateKey: 'e1',
                hidden: true
              }, {
                templateKey: 'e2'
              }];
              templates = [].concat(ent, [{
                templateKey: 'securityClassification-6VMVochwUWo'
              }]);
              expect(metadata.getUserAddableTemplates(custom, templates, true)).toEqual(['custom', {
                templateKey: 'e2'
              }]);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
  });
  describe('extractClassification()', function () {
    test('should extract and cache classification and return filtered instances',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var cache;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              cache = new Cache();
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getClassificationCacheKey = jest.fn().mockReturnValueOnce('cache_id_classification');
              expect(metadata.extractClassification('id', [{
                $template: 'foo'
              }, {
                $template: 'bad'
              }, {
                $template: 'securityClassification-6VMVochwUWo'
              }])).toEqual([{
                $template: 'foo'
              }, {
                $template: 'bad'
              }]);
              expect(metadata.getClassificationCacheKey).toHaveBeenCalledWith('id');
              expect(cache.get('cache_id_classification')).toEqual({
                $template: 'securityClassification-6VMVochwUWo'
              });

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
    test('should return instances if no classification found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var cache;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              cache = new Cache();
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getClassificationCacheKey = jest.fn().mockReturnValueOnce('cache_id_classification');
              expect(metadata.extractClassification('id', [{
                $template: 'foo'
              }, {
                $template: 'bad'
              }])).toEqual([{
                $template: 'foo'
              }, {
                $template: 'bad'
              }]);
              expect(metadata.getClassificationCacheKey).not.toHaveBeenCalled();
              expect(cache.get('cache_id_classification')).toBeUndefined();

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
  });
  describe('getTemplateForInstance()', function () {
    var templatesFromServer = [{
      id: 1,
      scope: 'global',
      templateKey: 'global1'
    }, {
      id: 2,
      scope: 'enterprise',
      templateKey: 'enterprise2'
    }, {
      id: 3,
      scope: 'enterprise',
      templateKey: 'enterprise3'
    }, {
      id: 4,
      scope: 'enterprise',
      templateKey: 'enterprise4'
    }, {
      id: 5,
      scope: 'global',
      templateKey: 'global5'
    }, {
      id: 6,
      scope: 'global',
      templateKey: 'global6'
    }];
    test('should return undefined when no global template found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var template;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return metadata.getTemplateForInstance('id', {
                $id: 'instanceId',
                $scope: 'global',
                $template: 'foo'
              }, templatesFromServer);

            case 2:
              template = _context15.sent;
              expect(template).toBeUndefined();

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
    test('should return found enterprise template',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var template;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return metadata.getTemplateForInstance('id', {
                $id: 'instanceId',
                $scope: 'enterprise',
                $template: 'enterprise2'
              }, templatesFromServer);

            case 2:
              template = _context16.sent;
              expect(template).toBe(templatesFromServer[1]);

            case 4:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    test('should return templates scoped to instance id',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var template;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              metadata.getTemplates = jest.fn().mockResolvedValueOnce(['collabed_template']);
              _context17.next = 3;
              return metadata.getTemplateForInstance('id', {
                $id: 'instanceId',
                $scope: 'enterprise',
                $template: 'foobar'
              }, templatesFromServer);

            case 3:
              template = _context17.sent;
              expect(template).toBe('collabed_template');
              expect(metadata.getTemplates).toBeCalledWith('id', 'enterprise', 'instanceId');

            case 6:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  describe('getEditors()', function () {
    test('should build and return editors with valid templates',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var instances, editors;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              instances = [{
                $id: '1',
                $scope: 'global',
                $template: 'global1'
              }, {
                $id: '2',
                $scope: 'enterprise',
                $template: 'enterprise2'
              }, {
                $id: '3',
                $scope: 'enterprise',
                $template: 'enterprise3'
              }, {
                $id: '4',
                $scope: 'global',
                $template: 'custom'
              }, {
                $id: '5',
                $scope: 'global',
                $template: 'bogus'
              }];
              metadata.extractClassification = jest.fn().mockReturnValueOnce(instances);
              metadata.createEditor = jest.fn().mockReturnValueOnce('editor1').mockReturnValueOnce('editor2').mockReturnValueOnce('editor3').mockReturnValueOnce('editor4');
              metadata.getTemplateForInstance = jest.fn().mockResolvedValueOnce('template1').mockResolvedValueOnce('template2').mockResolvedValueOnce('template3').mockResolvedValueOnce('template4').mockResolvedValueOnce();
              _context18.next = 6;
              return metadata.getEditors('id', instances, {}, [], [], true);

            case 6:
              editors = _context18.sent;
              expect(editors).toEqual(['editor1', 'editor2', 'editor3', 'editor4']);
              expect(metadata.extractClassification).toBeCalledWith('id', instances);
              expect(metadata.createEditor).toBeCalledTimes(4);
              expect(metadata.createEditor.mock.calls[0][0]).toBe(instances[0]);
              expect(metadata.createEditor.mock.calls[0][1]).toBe('template1');
              expect(metadata.createEditor.mock.calls[0][2]).toBe(true);
              expect(metadata.createEditor.mock.calls[1][0]).toBe(instances[1]);
              expect(metadata.createEditor.mock.calls[1][1]).toBe('template2');
              expect(metadata.createEditor.mock.calls[1][2]).toBe(true);
              expect(metadata.createEditor.mock.calls[2][0]).toBe(instances[2]);
              expect(metadata.createEditor.mock.calls[2][1]).toBe('template3');
              expect(metadata.createEditor.mock.calls[2][2]).toBe(true);
              expect(metadata.createEditor.mock.calls[3][0]).toBe(instances[3]);
              expect(metadata.createEditor.mock.calls[3][1]).toBe('template4');
              expect(metadata.createEditor.mock.calls[3][2]).toBe(true);
              expect(metadata.getTemplateForInstance).toBeCalledTimes(5);
              expect(metadata.getTemplateForInstance.mock.calls[0][0]).toBe('id');
              expect(metadata.getTemplateForInstance.mock.calls[0][1]).toBe(instances[0]);
              expect(metadata.getTemplateForInstance.mock.calls[0][2]).toEqual([{}]);
              expect(metadata.getTemplateForInstance.mock.calls[1][0]).toBe('id');
              expect(metadata.getTemplateForInstance.mock.calls[1][1]).toBe(instances[1]);
              expect(metadata.getTemplateForInstance.mock.calls[1][2]).toEqual([{}]);
              expect(metadata.getTemplateForInstance.mock.calls[2][0]).toBe('id');
              expect(metadata.getTemplateForInstance.mock.calls[2][1]).toBe(instances[2]);
              expect(metadata.getTemplateForInstance.mock.calls[2][2]).toEqual([{}]);
              expect(metadata.getTemplateForInstance.mock.calls[3][0]).toBe('id');
              expect(metadata.getTemplateForInstance.mock.calls[3][1]).toBe(instances[3]);
              expect(metadata.getTemplateForInstance.mock.calls[3][2]).toEqual([{}]);
              expect(metadata.getTemplateForInstance.mock.calls[4][0]).toBe('id');
              expect(metadata.getTemplateForInstance.mock.calls[4][1]).toBe(instances[4]);
              expect(metadata.getTemplateForInstance.mock.calls[4][2]).toEqual([{}]);

            case 38:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
  });
  describe('getMetadata()', function () {
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      metadata.errorHandler = jest.fn();
      metadata.successHandler = jest.fn();
      metadata.getMetadata({}, jest.fn(), jest.fn(), true);
      expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA);
      expect(metadata.errorHandler).toBeCalledWith('error');
      expect(metadata.successHandler).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no permissions object', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      metadata.errorHandler = jest.fn();
      metadata.successHandler = jest.fn();
      metadata.getMetadata({
        id: 'id'
      }, jest.fn(), jest.fn(), true);
      expect(metadata.errorCode).toBe(ERROR_CODE_FETCH_METADATA);
      expect(metadata.errorHandler).toBeCalledWith('error');
      expect(metadata.successHandler).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should not make request and and return cached data',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_metadata', 'cached_metadata');
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context19.next = 15;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true, {
                refreshCache: false
              });

            case 15:
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).not.toHaveBeenCalledWith();
              expect(metadata.getTemplates).not.toHaveBeenCalledWith();
              expect(metadata.getTemplates).not.toHaveBeenCalledWith();
              expect(metadata.getEditors).not.toHaveBeenCalledWith();
              expect(metadata.getUserAddableTemplates).not.toHaveBeenCalledWith();
              expect(metadata.successHandler).toHaveBeenCalledWith('cached_metadata');
              expect(metadata.successHandler).toHaveBeenCalledTimes(1);
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual('cached_metadata');

            case 27:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
    test('should make request and update cache and call success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context20.next = 14;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true);

            case 14:
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).toHaveBeenCalledWith(file.id, 'instances', 'custom', 'enterprise', 'global', true);
              expect(metadata.getUserAddableTemplates).toHaveBeenCalledWith('custom', 'enterprise', true, true);
              expect(metadata.successHandler).toHaveBeenCalledWith({
                editors: 'editors',
                templates: 'templates'
              });
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual({
                editors: 'editors',
                templates: 'templates'
              });

            case 25:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    test('should make request and update cache and call success handler after returning cached value when refreshCache is true',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_metadata', 'cached_metadata');
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context21.next = 15;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true, {
                refreshCache: true
              });

            case 15:
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).toHaveBeenCalledWith(file.id, 'instances', 'custom', 'enterprise', 'global', true);
              expect(metadata.getUserAddableTemplates).toHaveBeenCalledWith('custom', 'enterprise', true, true);
              expect(metadata.successHandler).toHaveBeenCalledTimes(2);
              expect(metadata.successHandler).toHaveBeenCalledWith('cached_metadata');
              expect(metadata.successHandler).toHaveBeenCalledWith({
                editors: 'editors',
                templates: 'templates'
              });
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual({
                editors: 'editors',
                templates: 'templates'
              });

            case 28:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
    test('should ignore cache and make request and update cache and call success handler when forceFetch is true',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_metadata', 'cached_metadata');
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context22.next = 15;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true, {
                forceFetch: true
              });

            case 15:
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).toHaveBeenCalledWith(file.id, 'instances', 'custom', 'enterprise', 'global', true);
              expect(metadata.getUserAddableTemplates).toHaveBeenCalledWith('custom', 'enterprise', true, true);
              expect(metadata.successHandler).toHaveBeenCalledTimes(1);
              expect(metadata.successHandler).not.toHaveBeenCalledWith('cached_metadata');
              expect(metadata.successHandler).toHaveBeenCalledWith({
                editors: 'editors',
                templates: 'templates'
              });
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual({
                editors: 'editors',
                templates: 'templates'
              });

            case 28:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    test('should make request and update cache and call success handler with metadata feature off',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context23.next = 14;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), false);

            case 14:
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).not.toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).toHaveBeenCalledWith(file.id, 'instances', 'custom', [], 'global', true);
              expect(metadata.getUserAddableTemplates).toHaveBeenCalledWith('custom', [], false, true);
              expect(metadata.successHandler).toHaveBeenCalledTimes(1);
              expect(metadata.successHandler).toHaveBeenCalledWith({
                editors: 'editors',
                templates: 'templates'
              });
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual({
                editors: 'editors',
                templates: 'templates'
              });

            case 26:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
    test('should call error handler on an error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockRejectedValueOnce('error');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context24.next = 14;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true);

            case 14:
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).not.toHaveBeenCalled();
              expect(metadata.getUserAddableTemplates).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).toHaveBeenCalledWith('error');
              expect(cache.get('cache_id_metadata')).toBeUndefined();

            case 25:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    test('should not call any callback when destroyed but still update the cache',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee25() {
      var file, cache;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              file = {
                id: 'id',
                is_externally_owned: true,
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_metadata', 'cached_metadata');
              metadata.errorHandler = jest.fn();
              metadata.successHandler = jest.fn();
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('cache_id_metadata');
              metadata.getInstances = jest.fn().mockResolvedValueOnce('instances');
              metadata.getEditors = jest.fn().mockResolvedValueOnce('editors');
              metadata.getCustomPropertiesTemplate = jest.fn().mockReturnValueOnce('custom');
              metadata.getUserAddableTemplates = jest.fn().mockReturnValueOnce('templates');
              metadata.getTemplates = jest.fn().mockResolvedValueOnce('global').mockResolvedValueOnce('enterprise');
              _context25.next = 15;
              return metadata.getMetadata(file, jest.fn(), jest.fn(), true, {
                forceFetch: true
              });

            case 15:
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getInstances).toHaveBeenCalledWith(file.id);
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'global');
              expect(metadata.getTemplates).toHaveBeenCalledWith(file.id, 'enterprise');
              expect(metadata.getEditors).toHaveBeenCalledWith(file.id, 'instances', 'custom', 'enterprise', 'global', true);
              expect(metadata.getUserAddableTemplates).toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_metadata')).toEqual({
                editors: 'editors',
                templates: 'templates'
              });

            case 26:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
  });
  describe('getSkills()', function () {
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.getSkills({}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_FETCH_SKILLS);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should not make request but get skills from cache and call success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee26() {
      var success, error, file, cache;
      return regeneratorRuntime.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                },
                metadata: {
                  global: {
                    boxSkillsCards: {
                      cards: []
                    }
                  }
                }
              };
              cache = new Cache();
              cache.set('cache_id_skills', ['card1', 'card2']);
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  cards: 'cards'
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context26.next = 15;
              return metadata.getSkills(file, success, error);

            case 15:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).not.toHaveBeenCalled();
              expect(metadata.xhr.get).not.toHaveBeenCalled();
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalledWith(['card1', 'card2']);
              expect(metadata.errorHandler).not.toHaveBeenCalled();

            case 23:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    })));
    test('should not make request but get skills from file and call success handler and ignore cache',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee27() {
      var success, error, file, cache;
      return regeneratorRuntime.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                },
                metadata: {
                  global: {
                    boxSkillsCards: {
                      cards: ['card3', 'card4']
                    }
                  }
                }
              };
              cache = new Cache();
              cache.set('cache_id_skills', ['card1', 'card2']);
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  cards: 'cards'
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context27.next = 15;
              return metadata.getSkills(file, success, error, true);

            case 15:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).not.toHaveBeenCalled();
              expect(metadata.xhr.get).not.toHaveBeenCalled();
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalledWith(['card3', 'card4']);
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_skills')).toEqual(['card3', 'card4']);

            case 24:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    })));
    test('should make request and update cache and success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee28() {
      var success, error, file, cache;
      return regeneratorRuntime.wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_skills', ['card1', 'card2']);
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  cards: ['card3', 'card4']
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context28.next = 14;
              return metadata.getSkills(file, success, error, true);

            case 14:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalledWith(['card3', 'card4']);
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_skills')).toEqual(['card3', 'card4']);

            case 24:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    })));
    test('should make request but update cache or call success handler when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee29() {
      var success, error, file, cache;
      return regeneratorRuntime.wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_skills', ['card1', 'card2']);
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce({
                data: {
                  cards: ['card3', 'card4']
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context29.next = 14;
              return metadata.getSkills(file, success, error, true);

            case 14:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('cache_id_skills')).toBeUndefined();

            case 23:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    })));
    test('should make request and call error handler for error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee30() {
      var success, error, file, cache, xhrError;
      return regeneratorRuntime.wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              cache.set('cache_id_skills', ['card1', 'card2']);
              xhrError = new Error('error');
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.get = jest.fn().mockReturnValueOnce(Promise.reject(xhrError));
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context30.next = 15;
              return metadata.getSkills(file, success, error, true);

            case 15:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.get).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).toHaveBeenCalledWith(xhrError);
              expect(cache.get('cache_id_skills')).toBeUndefined();

            case 24:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    })));
  });
  describe('updateSkills()', function () {
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateSkills({}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_SKILLS);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no permissions', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateSkills({
        id: 'id'
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_SKILLS);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad permissions error', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateSkills({
        id: 'id',
        permissions: {}
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_SKILLS);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should make request and call merge and success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee31() {
      var success, error, file, ops, cacheSet;
      return regeneratorRuntime.wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cacheSet = jest.fn();
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce({
                data: {
                  cards: 'cards'
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce({
                set: cacheSet
              });
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context31.next = 16;
              return metadata.updateSkills(file, ops, success, error);

            case 16:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(cacheSet).toHaveBeenCalledWith('cache_id_skills', 'cards');
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.getSkillsCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.merge).toHaveBeenCalledWith('cache_id', 'metadata.global.boxSkillsCards', {
                cards: 'cards'
              });
              expect(metadata.successHandler).toHaveBeenCalledWith('cards');
              expect(metadata.errorHandler).not.toHaveBeenCalled();

            case 28:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31);
    })));
    test('should make request but not merge or call success handler when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee32() {
      var success, error, file, ops, cacheSet;
      return regeneratorRuntime.wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cacheSet = jest.fn();
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce({
                data: {
                  cards: 'cards'
                }
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce({
                set: cacheSet
              });
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context32.next = 16;
              return metadata.updateSkills(file, ops, success, error);

            case 16:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(cacheSet).not.toHaveBeenCalled();
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getCacheKey).not.toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).not.toHaveBeenCalled();
              expect(metadata.merge).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();

            case 28:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    })));
    test('should make request and call error handler for error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee33() {
      var success, error, file, ops, cacheSet, xhrError;
      return regeneratorRuntime.wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cacheSet = jest.fn();
              xhrError = new Error('error');
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce(Promise.reject(xhrError));
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce({
                set: cacheSet
              });
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getSkillsCacheKey = jest.fn().mockReturnValueOnce('cache_id_skills');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context33.next = 17;
              return metadata.updateSkills(file, ops, success, error);

            case 17:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'global', 'boxSkillsCards');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(cacheSet).not.toHaveBeenCalled();
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getCacheKey).not.toHaveBeenCalled();
              expect(metadata.getSkillsCacheKey).not.toHaveBeenCalled();
              expect(metadata.merge).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).toHaveBeenCalledWith(xhrError);

            case 29:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33);
    })));
  });
  describe('updateMetadata()', function () {
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateMetadata({}, {}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no permissions', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateMetadata({
        id: 'id'
      }, {}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad permissions error', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateMetadata({
        id: 'id',
        permissions: {}
      }, {}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should call error callback with a bad permissions error when can upload is false', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.updateMetadata({
        id: 'id',
        permissions: {
          can_upload: false
        }
      }, {}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_UPDATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should make request and update cache and call success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee34() {
      var success, error, file, ops, cache, template, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context34.next = 21;
              return metadata.updateMetadata(file, template, ops, success, error);

            case 21:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.createEditor).toHaveBeenCalledWith('foo', template, true);
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalledWith(updatedMetadata);
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [updatedMetadata]
              });

            case 32:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    })));
    test('should make request but not update cache or call success handler when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee35() {
      var success, error, file, ops, cache, template, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context35.next = 20;
              return metadata.updateMetadata(file, template, ops, success, error);

            case 20:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.createEditor).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });

            case 31:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35);
    })));
    test('should make request and call error handler for error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee36() {
      var success, error, file, ops, cache, template, xhrError, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              ops = [{
                op: 'add'
              }, {
                op: 'test'
              }];
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              xhrError = new Error('error');
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.put = jest.fn().mockReturnValueOnce(Promise.reject(xhrError));
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context36.next = 21;
              return metadata.updateMetadata(file, template, ops, success, error);

            case 21:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.put).toHaveBeenCalledWith({
                url: 'url',
                headers: {
                  'Content-Type': 'application/json-patch+json'
                },
                id: 'file_id',
                data: ops
              });
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.createEditor).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });
              expect(metadata.errorHandler).toHaveBeenCalledWith(xhrError);

            case 32:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36);
    })));
  });
  describe('createMetadata()', function () {
    test('should call error callback with a bad item error when no file', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata(undefined, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no template', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({}, undefined, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no permissions', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({
        id: 'id'
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad permissions error', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({
        id: 'id',
        permissions: {}
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should call error callback with a bad permissions error when can upload is false', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({
        id: 'id',
        permissions: {
          can_upload: false
        }
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should call error callback when file is externally owned and template isnt global', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({
        id: 'id',
        permissions: {
          can_upload: true
        },
        is_externally_owned: true
      }, {
        scope: 'global',
        template: 'foo'
      }, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should call error callback when file is externally owned and template isnt properties', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.createMetadata({
        id: 'id',
        permissions: {
          can_upload: true
        },
        is_externally_owned: true
      }, {
        scope: 'blah',
        template: 'properties'
      }, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_CREATE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should make request and update cache and call success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee37() {
      var success, error, file, cache, template, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.post = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context37.next = 20;
              return metadata.createMetadata(file, template, success, error);

            case 20:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.post).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id',
                data: {}
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.createEditor).toHaveBeenCalledWith('foo', template, true);
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalledWith(updatedMetadata);
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata, updatedMetadata]
              });

            case 31:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37);
    })));
    test('should make request but not update cache or call success handler when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee38() {
      var success, error, file, cache, template, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.post = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context38.next = 20;
              return metadata.createMetadata(file, template, success, error);

            case 20:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.post).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id',
                data: {}
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.createEditor).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });

            case 31:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38);
    })));
    test('should make request and call error handler for error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee39() {
      var success, error, file, cache, template, xhrError, priorMetadata, updatedMetadata;
      return regeneratorRuntime.wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              xhrError = new Error('error');
              priorMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              updatedMetadata = {
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'baz'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.post = jest.fn().mockReturnValueOnce(Promise.reject(xhrError));
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.createEditor = jest.fn().mockReturnValueOnce(updatedMetadata);
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context39.next = 21;
              return metadata.createMetadata(file, template, success, error);

            case 21:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.post).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id',
                data: {}
              });
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.createEditor).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });
              expect(metadata.errorHandler).toHaveBeenCalledWith(xhrError);

            case 32:
            case "end":
              return _context39.stop();
          }
        }
      }, _callee39);
    })));
  });
  describe('deleteMetadata()', function () {
    test('should call error callback with a bad item error when no file', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata(undefined, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no template', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata({}, undefined, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no id', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata({}, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad item error when no permissions', function () {
      ErrorUtil.getBadItemError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata({
        id: 'id'
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadItemError).toBeCalled();
    });
    test('should call error callback with a bad permissions error', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata({
        id: 'id',
        permissions: {}
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should call error callback with a bad permissions error when can upload is false', function () {
      ErrorUtil.getBadPermissionsError = jest.fn().mockReturnValueOnce('error');
      var successCallback = jest.fn();
      var errorCallback = jest.fn();
      metadata.deleteMetadata({
        id: 'id',
        permissions: {
          can_upload: false
        }
      }, {}, successCallback, errorCallback);
      expect(errorCallback).toBeCalledWith('error', ERROR_CODE_DELETE_METADATA);
      expect(successCallback).not.toBeCalled();
      expect(ErrorUtil.getBadPermissionsError).toBeCalled();
    });
    test('should make request and update cache and call success handler',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee40() {
      var success, error, file, cache, template, priorMetadata;
      return regeneratorRuntime.wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                template: template,
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.delete = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context40.next = 18;
              return metadata.deleteMetadata(file, template, success, error);

            case 18:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.delete).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).toHaveBeenCalledWith(file.id);
              expect(metadata.successHandler).toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: []
              });

            case 28:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40);
    })));
    test('should make request but not update cache or call success handler when destroyed',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee41() {
      var success, error, file, cache, template, priorMetadata;
      return regeneratorRuntime.wrap(function _callee41$(_context41) {
        while (1) {
          switch (_context41.prev = _context41.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              priorMetadata = {
                template: template,
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.delete = jest.fn().mockReturnValueOnce({
                data: 'foo'
              });
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(true);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context41.next = 18;
              return metadata.deleteMetadata(file, template, success, error);

            case 18:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.delete).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(metadata.errorHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });

            case 28:
            case "end":
              return _context41.stop();
          }
        }
      }, _callee41);
    })));
    test('should make request and call error handler for error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee42() {
      var success, error, file, cache, template, xhrError, priorMetadata;
      return regeneratorRuntime.wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              success = jest.fn();
              error = jest.fn();
              file = {
                id: 'id',
                permissions: {
                  can_upload: true
                }
              };
              cache = new Cache();
              template = {
                scope: 'scope',
                templateKey: 'templateKey'
              };
              xhrError = new Error('error');
              priorMetadata = {
                template: template,
                instance: {
                  id: 'instance_id',
                  data: {
                    foo: 'bar'
                  }
                }
              };
              cache.set('metadata_id', {
                editors: [priorMetadata]
              });
              metadata.getMetadataUrl = jest.fn().mockReturnValueOnce('url');
              metadata.xhr.delete = jest.fn().mockReturnValueOnce(Promise.reject(xhrError));
              metadata.isDestroyed = jest.fn().mockReturnValueOnce(false);
              metadata.getCache = jest.fn().mockReturnValueOnce(cache);
              metadata.getCacheKey = jest.fn().mockReturnValueOnce('cache_id');
              metadata.getMetadataCacheKey = jest.fn().mockReturnValueOnce('metadata_id');
              metadata.merge = jest.fn().mockReturnValueOnce('file');
              metadata.successHandler = jest.fn();
              metadata.errorHandler = jest.fn();
              _context42.next = 19;
              return metadata.deleteMetadata(file, template, success, error);

            case 19:
              expect(metadata.successCallback).toBe(success);
              expect(metadata.errorCallback).toBe(error);
              expect(metadata.getMetadataUrl).toHaveBeenCalledWith(file.id, 'scope', 'templateKey');
              expect(metadata.xhr.delete).toHaveBeenCalledWith({
                url: 'url',
                id: 'file_id'
              });
              expect(metadata.isDestroyed).not.toHaveBeenCalled();
              expect(metadata.getCache).not.toHaveBeenCalled();
              expect(metadata.getMetadataCacheKey).not.toHaveBeenCalled();
              expect(metadata.successHandler).not.toHaveBeenCalled();
              expect(cache.get('metadata_id')).toEqual({
                editors: [priorMetadata]
              });
              expect(metadata.errorHandler).toHaveBeenCalledWith(xhrError);

            case 29:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42);
    })));
  });
});