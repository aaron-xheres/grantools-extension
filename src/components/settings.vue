<!-- TEMPLATE -->
<template>
  <n-card content-style="padding: 5px;">
    <n-tabs
      size="medium"
      :tabs-padding="20"
      pane-style="padding: 20px; padding-bottom: 0px;"
      justify-content="space-evenly"
    >
      <n-tab-pane name="SETTINGS">
        <h3 class="settingsCategory">Auto Refresh</h3>
        <n-card class="settingsCard" content-style="padding: 5px;">
          <table>
            <tr>
              <td><h4 class="switchTitle">Attack</h4></td>
              <td>
                <n-switch
                  v-model:value="dataStore.refreshAttack"
                  v-bind:disabled="!actionStore.autoRefresh"
                  @update:value="toggleRefreshAttack"
                />
              </td>
            </tr>
            <tr>
              <td><h4 class="switchTitle">Summon</h4></td>
              <td>
                <n-switch
                  v-model:value="dataStore.refreshSummon"
                  v-bind:disabled="!actionStore.autoRefresh"
                  @update:value="toggleRefreshSummon"
                />
              </td>
            </tr>
          </table>
        </n-card>
        <br style="margin-top: 10px; content: ' '" />
        <h3 class="settingsCategory">Repeat Stage</h3>
        <n-card class="settingsCard" content-style="padding: 5px;">
          <table>
            <tr>
              <td>
                <n-tooltip trigger="hover" style="max-width: 200px">
                  <template #trigger>
                    <h4 class="switchTitle">Replicard Expedition</h4>
                  </template>
                  Please ensure that this setting is turned ON before entering
                  the expedition page. <br /><br />
                  If the repeat is redirecting to the supporter page, keep this
                  setting ON and re-enter (refresh will not work) the expedition
                  page once
                </n-tooltip>
              </td>
              <td>
                <n-switch
                  v-model:value="dataStore.replicardExpedition"
                  v-bind:disabled="!actionStore.repeatStage"
                  @update:value="toggleReplicardExpedition"
                />
              </td>
            </tr>
          </table>
        </n-card>
      </n-tab-pane>
      <n-tab-pane name="RESET">
        <n-button @click="resetStores" class="btnReset"
          >RESET SETTINGS DATA</n-button
        >
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NButton, NCard, NSwitch, NTabs, NTabPane, NTooltip} from 'naive-ui';

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
    NTooltip,
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
      setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshAttack, value, true);
    },
    toggleRefreshSummon(value: boolean) {
      setStore(CONST.STORES.DATA, CONST.STORE_DATA.refreshSummon, value, true);
    },
    toggleReplicardExpedition(value: boolean) {
      setStore(
          CONST.STORES.DATA,
          CONST.STORE_DATA.replicardExpedition,
          value,
          true,
      );
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.settingsCategory {
  margin: 0px;
}
.settingsCard {
  width: 268px;
  padding: 0px;
}
.setting {
  margin: 2px;
}
.switchTitle {
  float: left;
  margin: 0px;
  margin-right: 10px;
}
.btnReset {
  margin-bottom: 15px;
}
.n-tab-pane {
  width: 284px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<!-- STYLE -->
