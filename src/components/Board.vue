<template>
  <div class="layout">
    <div class="wrapper">
      <div v-for="tab in tabs" :key="tab.id" class="list-wrapper">
        <b-card
          no-body
          :bg-variant="isOverflowed(tab) ? 'danger' : 'default'"
          :text-variant="isOverflowed(tab) ? 'white' : 'dark'"
          :header="isOverflowed(tab) ? 'danger' : 'default'"
        >
          <template v-slot:header>
            <CardHeader
              :tab="tab"
              :removeTab="removeTab"
              :onUpdate="saveLocalStorage"
            />
          </template>
          <TabList :tab="tab" :onUpdate="saveLocalStorage" />
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
import CardHeader from "./CardHeader";
import TabList from "./TabList";
import { LOCAL_STORAGE_TABS, getExistingTabs, Tab } from "../utils";

export default {
  name: "Board",
  data() {
    return {
      tabs: getExistingTabs(),
    };
  },
  methods: {
    removeTab(id) {
      this.tabs = this.tabs.filter((tab) => tab.id !== id);
    },
    addTab() {
      const newTab = new Tab({
        name: "",
        order: this.tabs.length,
        focus: true,
      });
      this.tabs = [...this.tabs, newTab];
    },
    isOverflowed(tab) {
      return tab.tasks.length > 5;
    },
    saveLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_TABS, JSON.stringify(this.tabs));
    },
  },
  components: {
    CardHeader,
    TabList,
  },
  updated() {
    this.saveLocalStorage();
  },
};
</script>

<style lang="scss">
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
.sortable-chosen .card {
  background-color: #e0e0e0;
}
.card.text-white {
  .card-link {
    color: white;
  }
}
</style>
