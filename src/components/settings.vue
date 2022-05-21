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
        <n-button class="resetSettingsData" @click="resetStores"
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
import {NButton, NCard, NTabs, NTabPane} from 'naive-ui';

import {resetStores} from '@/background';

export default defineComponent({
  name: 'ActionsComponent',
  components: {
    NButton,
    NCard,
    NTabs,
    NTabPane,
  },
  methods: {
    resetStores,
  },
  mounted() {},
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.n-tabs {
  width: 90vw;
}
.resetSettingsData {
  left: 30px;
}
</style>
<!-- STYLE -->
