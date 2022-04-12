import reorder from '../draggable-list-utils/reorder';
describe('components/draggable-list/draggable-list-utils/reorder', function () {
  describe('reorder()', function () {
    test('should reorder an array', function () {
      var list = [{
        id: 'item_0',
        label: 'item 0'
      }, {
        id: 'item_1',
        label: 'item 1'
      }, {
        id: 'item_2',
        label: 'item 2'
      }];
      var result = [{
        id: 'item_1',
        label: 'item 1'
      }, {
        id: 'item_2',
        label: 'item 2'
      }, {
        id: 'item_0',
        label: 'item 0'
      }];
      var startIndex = 0;
      var destinationIndex = 2;
      expect(reorder(list, startIndex, destinationIndex)).toEqual(result);
    });
  });
});