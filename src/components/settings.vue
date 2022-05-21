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
      <n-tab-pane name="SETTINGS"> SETTINGS </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NCard, NTabs, NTabPane} from 'naive-ui';

export default defineComponent({
  name: 'ActionsComponent',
  components: {
    NCard,
    NTabs,
    NTabPane,
  },
  methods: {},
  mounted() {},
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped>
.n-tabs {
  width: 90vw;
}
</style>
<!-- STYLE -->
