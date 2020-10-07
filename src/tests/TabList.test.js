import mount from './mount';
import TabList from '../components/TabList';
import { Tab, Task } from '../utils';

describe('TabList component', () => {
  it('should render a component', () => {
    const propsData = {
      onUpdate: jest.fn(),
      tab: new Tab({
        name: 'tabName',
        tasks: [new Task('task'), new Task('task')]
      })
    };
    const wrapper = mount(TabList, { propsData });

    expect(wrapper.is(TabList)).toBe(true);
    expect(wrapper.findAll('.task-wrapper')).toHaveLength(2);
  });
});
