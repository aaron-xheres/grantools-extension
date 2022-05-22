<!-- TEMPLATE -->
<template>
  <n-card content-style="padding: 0;">
    <n-tabs
      type="line"
      size="medium"
      :tabs-padding="20"
      pane-style="padding: 20px"
      justify-content="space-evenly"
    >
      <n-tab-pane name="SETTINGS">
        <h3 class="autoRefreshSettingsTitle">Auto Refresh</h3>
        <div class="settingsSection">
          <n-switch
            v-model:value="dataStore.refreshAttack"
            v-bind:disabled="!actionStore.autoRefresh"
            @update:value="toggleRefreshAttack"
          >
            <template #checked> Attacks </template>
            <template #unchecked> Attacks </template>
          </n-switch>
          <n-switch
            v-model:value="dataStore.refreshSummon"
            v-bind:disabled="!actionStore.autoRefresh"
            @update:value="toggleRefreshSummon"
          >
            <template #checked> Summons </template>
            <template #unchecked> Summons </template>
          </n-switch>
        </div>
      </n-tab-pane>
      <n-tab-pane name="RESET">
        <div class="settingsSection">
          <n-button @click="resetStores">RESET SETTINGS DATA</n-button>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NButton, NCard, NSwitch, NTabs, NTabPane} from 'naive-ui';

import * as CONST from '@/const';
import {actionStore, dataStore, setStore, resetStores} from '@/stores';

export default defineComponent({
  name: 'SettingsComponent',
  components: {
    NButton,
    NCard,
    NSwitch,
    NTabs,
    NTabPane,
  },
  data() {
    return {
      actionStore,
      dataStore,
    };
  },
  methods: {
    resetStores,
    toggleRefreshAttack(value: boolean) {
      setStore(CONST.STORE_DATA.refreshAttack, value, true);
    },
    toggleRefreshSummon(value: boolean) {
      setStore(CONST.STORE_DATA.refreshSummon, value, true);
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.n-tabs {
  width: 90vw;
}
.settingsSection {
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  right: 20px;
}
.autoRefreshSettingsTitle {
  margin-top: -10px;
  margin-bottom: 5px;
  margin-left: 65px;
}
</style>
<!-- STYLE -->
