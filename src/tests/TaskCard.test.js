import mount from './mount';
import TaskCard from '../components/TaskCard';
import { Tab, Task } from '../utils';

describe('TaskCard component', () => {
  it('should render a component', () => {
    const task = new Task({ name: 'task' });
    const propsData = {
      onUpdate: jest.fn(),
      tab: new Tab({
        name: 'tabName',
        tasks: [task]
      }),
      task
    };
    const wrapper = mount(TaskCard, { propsData });

    expect(wrapper.is(TaskCard)).toBe(true);
    expect(wrapper.find('.task-card').exists()).toBe(true);
  });
});
