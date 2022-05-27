<!-- TEMPLATE -->
<template>
  <n-card>
    <n-button @click="logStorage">Log Storage</n-button>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NButton, NCard} from 'naive-ui';

import localStorage from '@/localStorage';

export default defineComponent({
  name: 'StatusComponent',
  components: {
    NButton,
    NCard,
  },
  methods: {
    logStorage: async () => {
      console.log('[LOG STORAGE]', await localStorage.getAllData());
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped></style>
<!-- STYLE -->
