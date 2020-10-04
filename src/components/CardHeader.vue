<template>
  <form v-if="tab.focus" @submit="onSubmit">
    <b-form-input v-model="tab.name" @blur="onTabBlur(tab)" ref="tabInput" />
  </form>
  <div class="card-top" v-else>
    <h6 class="mb-0 mr-1" @click="tab.focus = true" :title="tab.name">
      {{ tab.name }}
    </h6>
    <b-badge :variant="tab.isOverflowed ? 'danger' : 'secondary'"
      >{{ tab.tasks.length }}/5</b-badge
    >
    <b-icon icon="lock-fill" v-if="tab.isProtected" aria-hidden="true"></b-icon>
    <b-dropdown size="sm" variant="light" text="...">
      <b-dropdown-item @click="tab.isProtected = !tab.isProtected">{{
        $t(tab.isProtected ? "unprotect" : "protect")
      }}</b-dropdown-item>
      <b-dropdown-item @click="removeTab(tab.id)">{{
        $t("delete")
      }}</b-dropdown-item>
      <b-dropdown-item v-if="tab.tasks.length > 0" @click="tab.clean()">{{
        $t("clean")
      }}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { onSubmitBlur } from "../utils";

export default {
  name: "CardHeader",
  props: ["tab", "removeTab"],
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
  mounted() {
    this.onFocus();
  },
  updated() {
    this.onFocus();
    console.log("updated");
  },
};
</script>

<style lang="scss" scoped>
.card-top {
  display: flex;
  align-items: center;
}
h6 {
  padding: 10px 0 9px;
  flex: 1;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.dropdown {
  margin-left: 4px;

  ::after {
    display: none;
  }
}
</style>
