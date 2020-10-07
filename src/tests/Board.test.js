import mount from './mount';
import Board from '../components/Board';

describe('Board component', () => {
  it('should render a component', () => {
    const wrapper = mount(Board);

    expect(wrapper.is(Board)).toBe(true);
  });
});
