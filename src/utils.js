import uniqid from "uniqid";

export const LOCAL_STORAGE_TABS = "tabs";
export const LOCAL_STORAGE_LANGUAGE = "localeKey";

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
  tasks = [],
  focus = false,
  id = uniqid(),
  isProtected = false,
}) {
  this.name = name;
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

export const getExistingTasks = (tasks = []) =>
  tasks
    .map(({ name, id, desc }) => new Task({ name, id, desc }))
    .filter(({ name }) => !!name);

export const getExistingTabs = () => {
  try {
    const existingTabs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TABS));
    const savedTabs = existingTabs ? existingTabs : [];
    return savedTabs
      .map(
        ({ name, tasks, id, isProtected }) =>
          new Tab({
            name,
            tasks: getExistingTasks(tasks),
            isProtected,
            id,
          })
      )
      .filter(({ name }) => !!name);
  } catch (e) {
    return [];
  }
};
