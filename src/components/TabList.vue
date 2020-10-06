<template>
  <draggable
    class="list-group-flush"
    tag="b-card-body"
    v-model="tab.tasks"
    v-bind="dragOptions"
  >
    <div v-for="task in tab.tasks" :key="task.id" class="task-wrapper">
      <TaskCard :tab="tab" :task="task" :onUpdate="onUpdate" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./TaskCard";

export default {
  name: "TabList",
  props: ["tab", "onUpdate"],
  components: {
    draggable,
    TaskCard,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: this.tab.isProtected,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.task-wrapper {
  & + & {
    margin-top: 8px;
  }
}
</style>
