import CardHeader from "../components/CardHeader";
import { Task, Tab } from "../utils";
import mount from "./mount";

describe("CardHeader component", () => {
  it("should render a component", () => {
    const propsData = {
      removeTab: jest.fn(),
      onUpdate: jest.fn(),
      tab: new Tab({ name: "tabName", tasks: [new Task("task")] }),
    };
    const wrapper = mount(CardHeader, { propsData });

    expect(wrapper.is(CardHeader)).toBe(true);
    expect(wrapper.find(".custom-input").exists()).toBe(false);
    expect(wrapper.find(".tab-title").text()).toBe("tabName");
    expect(wrapper.find('[data-test="nb-tasks"]').text()).toEqual("1/5");
    expect(wrapper.find('[data-test="task-protected"]').exists()).toBe(false);
  });

  it("should render a focused component", () => {
    const propsData = {
      removeTab: jest.fn(),
      onUpdate: jest.fn(),
      tab: new Tab({ name: "tabName", focus: true, tasks: [new Task("task")] }),
    };
    const wrapper = mount(CardHeader, { propsData });

    expect(wrapper.is(CardHeader)).toBe(true);
    expect(wrapper.find(".custom-input").exists()).toBe(true);
    expect(wrapper.find(".card-top").exists()).toBe(false);
  });

  it("should render a protected component", () => {
    const propsData = {
      removeTab: jest.fn(),
      onUpdate: jest.fn(),
      tab: new Tab({
        name: "tabName",
        isProtected: true,
        tasks: [new Task("task")],
      }),
    };
    const wrapper = mount(CardHeader, { propsData });

    expect(wrapper.is(CardHeader)).toBe(true);
    expect(wrapper.find('[data-test="task-protected"]').exists()).toBe(true);
  });
});
