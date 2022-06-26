<!-- TEMPLATE -->
<template>
  <n-card>
    <h3 style="margin-bottom: 0px; margin-top: 0px">GRANTOOLS EXTENSION</h3>
    <div style="text-align: center; font-size: smaller">
      {{ `${UI.VERSION.RELEASE}v${UI.VERSION.NUMBER}` }}
    </div>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NCard} from 'naive-ui';

import {UI} from '@/const';

export default defineComponent({
  name: 'StatusComponent',
  components: {
    NCard,
  },
  data() {
    return {
      UI,
    };
  },
  methods: {},
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped></style>
<!-- STYLE -->
