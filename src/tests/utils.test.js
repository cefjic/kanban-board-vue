import {
  Tab,
  Task,
  onSubmitBlur,
  getExistingTasks,
  getExistingTabs,
  LOCAL_STORAGE_TABS,
} from "../utils";

describe("Tab prototype", () => {
  it("should create new Tab with default values", () => {
    const tab = new Tab({ name: "tab" });
    expect(tab.name).toEqual("tab");
    expect(tab.focus).toEqual(false);
    expect(tab.id).not.toEqual(undefined);
    expect(tab.isProtected).toEqual(false);
    expect(tab.tasks).toEqual([]);
  });

  it("should create new Tab with values", () => {
    const tab = new Tab({
      name: "tab",
      focus: true,
      id: "id",
      isProtected: true,
      tasks: [new Task({ name: "task" })],
    });
    expect(tab.name).toEqual("tab");
    expect(tab.focus).toEqual(true);
    expect(tab.id).toEqual("id");
    expect(tab.isProtected).toEqual(true);
    expect(tab.tasks).toHaveLength(1);
  });

  it("should add task", () => {
    const tab = new Tab({ name: "test", tasks: [new Task({ name: "task" })] });
    expect(tab.tasks).toHaveLength(1);
    tab.addTask("new");
    expect(tab.tasks).toHaveLength(2);
  });

  it("should remove task", () => {
    const task = new Task({ name: "task" });
    const tab = new Tab({ name: "test", tasks: [task] });
    expect(tab.tasks).toHaveLength(1);
    tab.removeTask(task.id);
    expect(tab.tasks).toHaveLength(0);
  });

  it("should remove one task", () => {
    const tasks = [new Task({ name: "task" }), new Task({ name: "task" })];
    const tab = new Tab({ name: "test", tasks });
    expect(tab.tasks).toHaveLength(2);
    tab.removeTask(tasks[0].id);
    expect(tab.tasks).toHaveLength(1);
  });

  it("should not remove task", () => {
    const task = new Task({ name: "task" });
    const tab = new Tab({ name: "test", tasks: [task] });
    expect(tab.tasks).toHaveLength(1);
    tab.removeTask("wrongId");
    expect(tab.tasks).toHaveLength(1);
  });

  it("should reset tasks", () => {
    const tasks = [new Task({ name: "task" }), new Task({ name: "task" })];
    const tab = new Tab({ name: "test", tasks });
    tab.clean();
    expect(tab.tasks).toHaveLength(0);
  });

  it("clean should works but do nothing", () => {
    const tab = new Tab({ name: "test" });
    tab.clean();
    expect(tab.tasks).toHaveLength(0);
  });
});

describe("Task prototype", () => {
  it("should create new Task with default values", () => {
    const task = new Task({ name: "task" });
    expect(task.name).toEqual("task");
    expect(task.focus).toEqual(false);
    expect(task.id).not.toEqual(undefined);
    expect(task.desc).toEqual("");
  });

  it("should create new Task with custom values", () => {
    const task = new Task({
      name: "task",
      focus: true,
      id: "id",
      desc: "desc",
    });
    expect(task.name).toEqual("task");
    expect(task.focus).toEqual(true);
    expect(task.id).toEqual("id");
    expect(task.desc).toEqual("desc");
  });
});

describe("onSubmitBlur function", () => {
  it("should call preventDefault function and blur", () => {
    const mockBlur = jest.fn();
    const mockEvent = jest.fn();
    document.activeElement.blur = mockBlur;
    onSubmitBlur({ preventDefault: mockEvent });

    expect(mockEvent).toHaveBeenCalled();
    expect(mockBlur).toHaveBeenCalled();
  });
});

describe("getExistingTasks function", () => {
  it("should return Task prototypes array", () => {
    expect(
      getExistingTasks([{ name: "a" }, { name: "b" }, { name: "" }])
    ).toHaveLength(2);
    expect(getExistingTasks()).toHaveLength(0);
    expect(getExistingTasks(["a", "b"])).toHaveLength(0);
  });
});

describe("getExistingTabs function", () => {
  it("should return empty Tab array", () => {
    expect(getExistingTabs()).toEqual([]);
  });

  it("should return empty Tab array", () => {
    localStorage.setItem(LOCAL_STORAGE_TABS, "[]");
    expect(getExistingTabs()).toEqual([]);
  });

  it("should return empty Tab array", () => {
    localStorage.setItem(LOCAL_STORAGE_TABS, "test");
    expect(getExistingTabs()).toEqual([]);
  });

  it("should return 3 default Tabs array", () => {
    localStorage.setItem(
      LOCAL_STORAGE_TABS,
      JSON.stringify([
        { name: "tab" },
        { name: "tab" },
        { name: "tab" },
        { name: "" },
      ])
    );
    expect(getExistingTabs()).toHaveLength(3);
  });

  it("should return 3 custom Tabs array", () => {
    localStorage.setItem(
      LOCAL_STORAGE_TABS,
      JSON.stringify([
        { name: "tab", id: "id", isProtected: true, tasks: [{ name: "task" }] },
      ])
    );
    const [tab] = getExistingTabs();
    expect(tab.id).toEqual("id");
    expect(tab.name).toEqual("tab");
    expect(tab.isProtected).toEqual(true);
    expect(tab.tasks).toHaveLength(1);
  });
});
