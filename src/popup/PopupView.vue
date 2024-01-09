<!-- TEMPLATE -->
<template>
  <n-config-provider :theme="darkTheme">
    <statusVue />
    <donateVue />
    <actionsVue />
    <settingsVue />
  </n-config-provider>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NConfigProvider, darkTheme} from 'naive-ui';

import statusVue from '@/components/status.vue';
import actionsVue from '@/components/actions.vue';
import settingsVue from '@/components/settings.vue';
import donateVue from '@/components/donate.vue';

export default defineComponent({
  setup() {
    return {
      darkTheme,
    };
  },
  components: {
    NConfigProvider,
    statusVue,
    actionsVue,
    settingsVue,
    donateVue,
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style>
.n-card {
  width: 284px;
  display: flex;
  justify-items: center;
  align-items: center;
  margin: 8px;
}
</style>
<!-- STYLE -->
