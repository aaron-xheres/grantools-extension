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
        <h3 class="innerCategory">Auto Refresh</h3>
        <n-card class="innerCard" content-style="padding: 5px;">
          <table>
            <tr>
              <td><h4 class="innerCardSwitchTitle">Attack</h4></td>
              <td>
                <n-switch
                  v-model:value="dataStore.refreshAttack"
                  v-bind:disabled="!actionStore.autoRefresh"
                  @update:value="toggleRefreshAttack"
                />
              </td>
            </tr>
            <tr>
              <td><h4 class="innerCardSwitchTitle">Summon</h4></td>
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
        <h3 class="innerCategory">Repeat Stage</h3>
        <n-card class="innerCard" content-style="padding: 5px;">
          <table>
            <tr>
              <td>
                <n-tooltip trigger="hover" style="max-width: 200px">
                  <template #trigger>
                    <h4 class="innerCardSwitchTitle">Replicard Expedition</h4>
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
        <br style="margin-top: 10px; content: ' '" />
        <n-button @click="resetStores" class="innerBtn"
          >RESET SETTINGS DATA</n-button
        >
      </n-tab-pane>

      <n-tab-pane name="INFO">
        <h3 class="innerCategory">DEVELOPERS</h3>
        <n-card class="innerCard">
          <n-button @click="openTab('https://github.com/aaron-xheres')"
            >Aaron 'XhERES' Tan</n-button
          >
        </n-card>
        <br style="margin-top: 10px; content: ' '" />
        <h3 class="innerCategory">DEBUG</h3>
        <br style="margin-top: 10px; content: ' '" />
        <n-button @click="logStorage" class="innerBtn">Log Storage</n-button>
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
import localStorage from '@/localStorage';
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

    openTab: async (link: string): Promise<void> => {
      window.open(link, '_blank');
    },

    logStorage: async (): Promise<void> => {
      console.log('[LOG STORAGE]', await localStorage.getAllData());
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.innerCategory {
  margin: 0px;
  padding: 5px;
}
.innerBtn {
  margin-bottom: 15px;
}
.innerCard {
  width: 268px;
  padding: 0px;
}
.innerCardSwitchTitle {
  float: left;
  margin: 0px;
  margin-right: 10px;
}
.n-tab-pane {
  width: 284px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<!-- STYLE -->
