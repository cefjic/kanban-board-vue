import mount from "./mount";
import Board from "../components/Board";
import { Tab, Task } from "../utils";

describe("Board component", () => {
  it("should render a component", () => {
    const wrapper = mount(Board);

    expect(wrapper.is(Board)).toBe(true);
  });
});
