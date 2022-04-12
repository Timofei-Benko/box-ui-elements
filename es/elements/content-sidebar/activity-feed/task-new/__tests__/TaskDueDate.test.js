import * as React from 'react';
import { mount } from 'enzyme';
import TaskDueDate from '../TaskDueDate';
describe('elements/content-sidebar/ActivityFeed/task-new/TaskDueDate', function () {
  test('should render the proper DOM structure', function () {
    var dueDate = mount(React.createElement(TaskDueDate, {
      dueDate: new Date(987654321000),
      status: "NOT_STARTED"
    }));
    expect(dueDate).toMatchSnapshot();
  });
  test('should add proper class when past due date', function () {
    var dueDate = shallow(React.createElement(TaskDueDate, {
      dueDate: new Date() - 1000,
      status: "NOT_STARTED"
    }));
    expect(dueDate.find('[data-testid="task-overdue-date"]')).toHaveLength(1);
  });
});