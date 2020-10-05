import uniqid from "uniqid";

export const LOCAL_STORAGE_TABS = "tabs";

export const onSubmitBlur = (e) => {
  e.preventDefault();
  document.activeElement.blur();
};

export function Task({ name, focus = false, id = uniqid(), desc = "" }) {
  this.name = name;
  this.focus = focus;
  this.id = id;
  this.desc = desc;
}

export function Tab({
  name,
  order,
  tasks = [],
  focus = false,
  id = uniqid(),
  isProtected = false,
}) {
  this.name = name;
  this.order = order;
  this.tasks = tasks;
  this.id = id;
  this.focus = focus;
  this.isProtected = isProtected;
  this.addTask = (taskName) => {
    this.tasks = [...this.tasks, new Task({ name: taskName, focus: true })];
  };
  this.removeTask = (taskId) => {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  };
  this.clean = () => {
    this.tasks = [];
  };
}

const getExistingTasks = (tasks) =>
  tasks.map(({ name, id, desc }) => new Task({ name, id, desc }));

export const getExistingTabs = () => {
  const existingTabs = localStorage.getItem(LOCAL_STORAGE_TABS);
  const savedTabs = existingTabs ? JSON.parse(existingTabs) : [];
  return savedTabs.map(
    ({ name, tasks, order, id, isProtected }) =>
      new Tab({
        name,
        order,
        tasks: getExistingTasks(tasks),
        isProtected,
        id,
      })
  );
};
