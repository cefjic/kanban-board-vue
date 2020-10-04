<template>
  <div class="layout">
    <div class="wrapper">
      <div v-for="tab in tabs" :key="tab.id" class="list-wrapper">
        <b-card
          no-body
          :bg-variant="tab.isOverflowed ? 'danger' : 'default'"
          :text-variant="tab.isOverflowed ? 'white' : 'dark'"
          :header="tab.isOverflowed ? 'danger' : 'default'"
        >
          <template v-slot:header>
            <CardHeader :tab="tab" :removeTab="removeTab" />
          </template>
          <draggable
            class="list-group-flush"
            tag="b-card-body"
            v-model="tabs.tab"
            v-bind="{ ...dragOptions, disabled: tab.isProtected }"
            @start="isDragging = true"
            @end="onMoveEnd"
          >
            <div v-for="task in tab.tasks" :key="task.id" class="task-wrapper">
              <TaskCard :tab="tab" :task="task" />
            </div>
          </draggable>
          <b-card-body>
            <a href="#" class="card-link" @click="tab.addTask('')">
              <b-icon icon="plus" aria-hidden="true"></b-icon>
              {{ $tc("addTask", tab.tasks.length + 1) }}
            </a>
          </b-card-body>
        </b-card>
      </div>
      <div class="list-wrapper">
        <b-button class="w-100" variant="light" @click="addTab">{{
          $tc("addTab", tabs.length + 1)
        }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import uniqid from "uniqid";
import CardHeader from "./CardHeader";
import TaskCard from "./TaskCard";

function Task(name, focus = false) {
  this.name = name;
  this.focus = focus;
  this.id = uniqid();
}

function Tab(name, order, tasks = [], focus = false) {
  this.name = name;
  this.order = order;
  this.tasks = tasks;
  this.id = uniqid();
  this.focus = focus;
  this.isProtected = false;
  this.isOverflowed = false;
  this.refreshOverflow = () => {
    this.isOverflowed = this.tasks.length > 5;
  };
  this.addTask = (taskName) => {
    this.tasks = [...this.tasks, new Task(taskName, true)];
    this.refreshOverflow();
  };
  this.removeTask = (taskId) => {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.refreshOverflow();
  };
  this.clean = () => {
    this.tasks = [];
    this.refreshOverflow();
  };
}

export default {
  name: "Board",
  data: () => ({
    tabs: [],
    isDragging: false,
    delayedDragging: false,
  }),
  methods: {
    removeTab(id) {
      this.tabs = this.tabs.filter((tab) => tab.id !== id);
    },
    addTab() {
      const newTab = new Tab("", this.tabs.length, [], true);
      this.tabs = [...this.tabs, newTab];
    },
    onMoveEnd() {
      this.isDragging = false;
    },
  },
  components: {
    draggable,
    CardHeader,
    TaskCard,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  flex: 1;
  margin-top: 24px;
}
.wrapper {
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.list-wrapper {
  display: flex;
  min-width: 300px;
  max-width: 300px;
  flex-direction: column;
  margin: 0 4px;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;

  &:first-child {
    margin-left: 8px;
  }

  &:last-child {
    margin-right: 8px;
  }
}
.list-group {
  flex: 1;
  min-height: 40px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.sortable-chosen .card {
  background-color: #e0e0e0;
}
.card.text-white a {
  color: white;
}
.task-wrapper {
  & + & {
    margin-top: 8px;
  }
}
</style>
