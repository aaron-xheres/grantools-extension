<!-- TEMPLATE -->
<template>
  <n-card>
    <n-button @click="attachDebugger">Attach Debugger</n-button>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NButton, NCard} from 'naive-ui';

export default defineComponent({
  name: 'StatusComponent',
  components: {
    NButton,
    NCard,
  },
  methods: {
    attachDebugger: () => {
      chrome.runtime.sendMessage({msg: 'attachDebugger'});
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped></style>
<!-- STYLE -->
