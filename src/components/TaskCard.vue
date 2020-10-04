<template>
  <b-card variant="default" text-variant="dark">
    <form v-if="task.focus" @submit="onSubmit">
      <b-form-input
        v-model="task.name"
        @blur="onTaskBlur(tab, task)"
        ref="taskInput"
      />
    </form>
    <b-card-text v-else @click="task.focus = true">
      {{ task.name }}
    </b-card-text>
  </b-card>
</template>

<script>
import { onSubmitBlur } from "../utils";

export default {
  name: "TaskCard",
  props: ["tab", "task"],
  methods: {
    onTaskBlur(tab, task) {
      if (!task.name) {
        tab.removeTask(task.id);
      } else {
        task.focus = false;
      }
    },
    onSubmit(e) {
      onSubmitBlur(e);
    },
    onFocus() {
      const input = this.$refs.taskInput;
      if (input) {
        input.focus();
      }
    },
  },
  mounted() {
    this.onFocus();
  },
  updated() {
    this.onFocus();
  },
};
</script>

<style lang="scss" scoped>
.card {
  cursor: move;

  &:hover {
    background-color: #f5f5f5;
  }

  & + & {
    margin-top: 8px;
  }
}
</style>
