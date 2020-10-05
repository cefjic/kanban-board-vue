<template>
  <b-card
    class="task-card"
    variant="primary"
    header="Primary"
    @click="showModal"
    no-body
  >
    <template v-slot:header>
      <form v-if="task.focus" @submit="onSubmit">
        <input
          v-model="task.name"
          @blur="onTaskBlur(tab, task)"
          ref="taskInput"
          class="custom-input"
        />
      </form>
      <b-card-text class="text-line" v-else>
        {{ task.name }}
      </b-card-text>
      <b-modal :id="`task-${task.id}`" :ref="`ref-${task.id}`">
        <template v-slot:modal-title>
          <form @submit="onSubmit">
            <b-input
              v-model="task.name"
              @blur="onTitleBlur(task)"
              id="title-modal-input"
            />
          </form>
        </template>
        <div class="d-block">
          <b-textarea v-model="task.desc"></b-textarea>
        </div>
        <template v-slot:modal-footer>
          <div class="button-wrapper">
            <b-button
              variant="danger"
              size="sm"
              @click="tab.removeTask(task.id)"
            >
              {{ $t("delete") }}
            </b-button>
            <b-button variant="primary" size="sm" @click="hideModal">
              {{ $t("close") }}
            </b-button>
          </div>
        </template>
      </b-modal>
    </template>
  </b-card>
</template>

<script>
import { onSubmitBlur } from "../utils";

export default {
  name: "TaskCard",
  props: ["tab", "task", "onUpdate"],
  methods: {
    onTaskBlur(tab, task) {
      if (!task.name) {
        tab.removeTask(task.id);
      } else {
        task.focus = false;
      }
    },
    onTitleBlur() {
      this.changeTaskName = false;
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
    showModal() {
      if (!this.task.focus) {
        this.$refs[`ref-${this.task.id}`].show();
      }
    },
    hideModal() {
      this.$refs[`ref-${this.task.id}`].hide();
    },
  },
  mounted() {
    this.onFocus();
  },
  updated() {
    this.onFocus();
    this.onUpdate();
  },
};
</script>

<style lang="scss">
.task-card {
  cursor: move;

  &:hover {
    background-color: #f5f5f5;
  }

  & + & {
    margin-top: 8px;
  }

  .card-header {
    border-bottom: unset;
  }
}
.button-wrapper {
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button + button {
    margin-left: 8px;
  }
}
.text-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.modal-title {
  width: 100%;
}
</style>
