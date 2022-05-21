<!-- TEMPLATE -->
<template>
  <n-card>
    <div class="button">
      <n-button @click="helloFromExtension" text style="font-size: 40px">
        <n-icon :color="actionStore.autoRefresh ? '#00a2e3' : '#7a8593'">
          <RefreshDot />
        </n-icon>
      </n-button>
    </div>
    <div class="button">
      <n-button @click="helloFromExtension" text style="font-size: 40px">
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

import {actionStore} from '@/stores/actionStores';
import {dataStore} from '@/stores/dataStores';

import {helloFromExtension} from '@/functions';

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
    helloFromExtension,
  },
  mounted() {},
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
