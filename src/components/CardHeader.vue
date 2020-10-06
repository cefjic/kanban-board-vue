<template>
  <form v-if="tab.focus" @submit="onSubmit">
    <input
      v-model="$v.tab.name.$model"
      @blur="onTabBlur()"
      ref="tabInput"
      class="custom-input"
      :aria-invalid="isNameRequired"
    />
    <div class="background"></div>
  </form>
  <div class="card-top" v-else>
    <span class="tab-title" @click="tab.focus = true" :title="tab.name">
      {{ tab.name }}
    </span>
    <b-badge :variant="isOverflowed ? 'danger' : 'secondary'"
      >{{ nbTasks }}/5</b-badge
    >
    <span v-b-tooltip.hover :title="$t('protected')" class="ml-1">
      <b-icon
        icon="lock-fill"
        v-if="tab.isProtected"
        aria-hidden="true"
      ></b-icon>
    </span>
    <b-dropdown size="sm" variant="light">
      <template v-slot:button-content>
        <b-icon icon="three-dots" aria-hidden="true"></b-icon>
      </template>
      <b-dropdown-item @click="tab.isProtected = !tab.isProtected">{{
        $t(tab.isProtected ? "unprotect" : "protect")
      }}</b-dropdown-item>
      <b-dropdown-item @click="removeTab(tab.id)" :disabled="tab.isProtected">{{
        $t("delete")
      }}</b-dropdown-item>
      <b-dropdown-item
        v-if="nbTasks > 0"
        @click="tab.clean()"
        :disabled="tab.isProtected"
        >{{ $t("clean") }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import { onSubmitBlur } from "../utils";
import { required } from "vuelidate/lib/validators";

export default {
  name: "CardHeader",
  data() {
    return {
      isNewTab: !this.tab.name,
    };
  },
  props: ["tab", "removeTab", "onUpdate"],
  methods: {
    onTabBlur() {
      if (this.isNameRequired) {
        this.onFocus();
      } else if (!this.tab.name) {
        this.removeTab(this.tab.id);
      } else {
        this.isNewTab = false;
        this.tab.focus = false;
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
    isNameRequired() {
      return !this.isNewTab && !this.$v.tab.name.required;
    },
  },
  validations: {
    tab: {
      name: { required },
    },
  },
  mounted() {
    this.onFocus();
  },
  updated() {
    this.onUpdate();
    this.onFocus();
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
  position: relative;
  &:focus {
    z-index: 2;
  }
  &[aria-invalid="true"] {
    border-color: #dc3545;
    outline-color: #dc3545;
  }
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0000003b;
  z-index: 1;
}
</style>
