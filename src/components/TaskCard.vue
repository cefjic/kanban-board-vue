<template>
  <b-card
    class="task-card"
    text-variant="dark"
    @click="isModalOpen = !isModalOpen"
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
        <div class="background"></div>
      </form>
      <b-card-text class="text-line" v-else>
        {{ task.name }}
      </b-card-text>
      <b-modal v-model="isModalOpen" @hidden="hideModal" @show="showModal">
        <template v-slot:modal-title>
          <form @submit="onSubmit">
            <b-input
              v-model="$v.task.name.$model"
              @blur="onTitleBlur(task)"
              id="title-modal-input"
              :state="!isNameRequired"
              :placeholder="$t('name')"
            />
          </form>
        </template>
        <div class="d-block">
          <b-textarea
            v-model="task.desc"
            :placeholder="$t('description')"
          ></b-textarea>
        </div>
        <template v-slot:modal-footer>
          <div class="button-wrapper">
            <b-button
              variant="danger"
              size="sm"
              @click="tab.removeTask(task.id)"
              :disabled="tab.isProtected"
            >
              {{ $t('delete') }}
            </b-button>
            <b-button variant="primary" size="sm" @click="isModalOpen = false">
              {{ $t('close') }}
            </b-button>
          </div>
        </template>
      </b-modal>
    </template>
  </b-card>
</template>

<script>
import { onSubmitBlur } from '../utils';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'TaskCard',
  data() {
    return {
      isModalOpen: false,
      originTaskName: ''
    };
  },
  props: ['tab', 'task', 'onUpdate'],
  validations: {
    task: {
      name: {
        required
      }
    }
  },
  methods: {
    onTaskBlur(tab, task) {
      if (this.isNameRequired) {
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
      this.originTaskName = this.task.name;
    },
    hideModal() {
      if (this.isNameRequired) {
        this.task.name = this.originTaskName;
      }
    }
  },
  mounted() {
    this.onFocus();
  },
  updated() {
    this.onUpdate();
  },
  computed: {
    isNameRequired() {
      return !this.$v.task.name.required;
    }
  }
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
  padding: 4px 10px;
}
.modal-title {
  width: 100%;
}
</style>
