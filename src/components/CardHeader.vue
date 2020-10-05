<template>
  <form v-if="tab.focus" @submit="onSubmit">
    <input
      v-model="tab.name"
      @blur="onTabBlur(tab)"
      ref="tabInput"
      class="custom-input"
    />
  </form>
  <div class="card-top" v-else>
    <span class="tab-title" @click="tab.focus = true" :title="tab.name">
      {{ tab.name }}
    </span>
    <b-badge :variant="isOverflowed ? 'danger' : 'secondary'"
      >{{ nbTasks }}/5</b-badge
    >
    <b-icon icon="lock-fill" v-if="tab.isProtected" aria-hidden="true"></b-icon>
    <b-dropdown size="sm" variant="light">
      <template v-slot:button-content>
        <b-icon icon="three-dots" aria-hidden="true"></b-icon>
      </template>
      <b-dropdown-item @click="tab.isProtected = !tab.isProtected">{{
        $t(tab.isProtected ? "unprotect" : "protect")
      }}</b-dropdown-item>
      <b-dropdown-item @click="removeTab(tab.id)">{{
        $t("delete")
      }}</b-dropdown-item>
      <b-dropdown-item v-if="nbTasks > 0" @click="tab.clean()">{{
        $t("clean")
      }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { onSubmitBlur } from "../utils";

export default {
  name: "CardHeader",
  props: ["tab", "removeTab", "onUpdate"],
  methods: {
    onTabBlur(tab) {
      if (!tab.name) {
        this.removeTab(tab.id);
      } else {
        tab.focus = false;
      }
    },
    onFocus() {
      const input = this.$refs.tabInput;
      if (input) {
        input.focus();
      }
    },
    onSubmit(e) {
      onSubmitBlur(e);
    },
  },
  computed: {
    isOverflowed() {
      return this.tab.tasks.length > 5;
    },
    nbTasks() {
      return this.tab.tasks.length;
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
.card-top {
  display: flex;
  align-items: center;
  padding: 2px 0;
}
.tab-title {
  flex: 1;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  padding-left: 10px;
  font-weight: bold;
}
.dropdown {
  margin-left: 4px;

  .dropdown-toggle {
    display: flex;

    &::after {
      display: none;
    }
  }
}
.custom-input {
  background: white;
  width: 100%;
  border-radius: 0.25rem;
  padding: 2px 8px;
  font-weight: bold;
}
</style>
