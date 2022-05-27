<!-- TEMPLATE -->
<template>
  <n-card>
    <div class="button">
      <n-button @click="toggleAutoRefresh" text style="font-size: 40px">
        <n-icon :color="actionStore.autoRefresh ? '#00a2e3' : '#7a8593'">
          <RefreshDot />
        </n-icon>
      </n-button>
    </div>
    <div class="button">
      <n-button @click="toggleRepeatStage" text style="font-size: 40px">
        <n-icon :color="actionStore.repeatStage ? '#00a2e3' : '#7a8593'">
          <Repeat />
        </n-icon>
      </n-button>
      <h2 class="repeatStageCounter">
        {{ dataStore.repeatStageCounter }}
      </h2>
    </div>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NButton, NCard, NIcon} from 'naive-ui';
import {RefreshDot, Repeat} from '@vicons/tabler';

import * as CONST from '@/const';
import {actionStore, dataStore, setStore} from '@/stores';

export default defineComponent({
  name: 'ActionsComponent',
  components: {
    NButton,
    NCard,
    NIcon,
    RefreshDot,
    Repeat,
  },
  data() {
    return {
      actionStore,
      dataStore,
    };
  },
  methods: {
    toggleAutoRefresh(): void {
      setStore(
          CONST.STORES.ACTIONS,
          CONST.STORE_ACTIONS.autoRefresh,
          !actionStore.autoRefresh,
          true,
      );
    },
    toggleRepeatStage(): void {
      setStore(
          CONST.STORES.ACTIONS,
          CONST.STORE_ACTIONS.repeatStage,
          !actionStore.repeatStage,
          true,
      );
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.button {
  padding-left: 30px;
  padding-right: 30px;
  float: left;
}

.repeatStageCounter {
  position: absolute;
  margin: 0px;
  left: 211px;
  bottom: 17px;
}
</style>
<!-- STYLE -->
