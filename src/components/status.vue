<!-- TEMPLATE -->
<template>
  <n-card>
    <h3 style="margin-bottom: 0px; margin-top: 0px">GRANTOOLS EXTENSION</h3>
    <div style="text-align: center; font-size: smaller">
      {{ `${UI.VERSION.RELEASE}v${UI.VERSION.NUMBER}` }}
    </div>
    <div v-if="newUpdate">
      <br />
      <div style="text-align: center">
        <n-button @click="goToUpdate">New Update Available!</n-button>
      </div>
    </div>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NCard, NButton} from 'naive-ui';

import {UI} from '@/const';

export default defineComponent({
  name: 'StatusComponent',
  components: {
    NCard,
    NButton,
  },
  data() {
    return {
      UI,
      newUpdate: false,
    };
  },
  methods: {
    goToUpdate: () => {
      window.open('https://github.com/aaron-xheres/grantools-extension/');
    },
  },
  created() {
    (async () => {
      const repoVersionReq = await fetch(
          'https://raw.githubusercontent.com/aaron-xheres/grantools-extension/main/version',
      );
      const repoVersion = await repoVersionReq.text();
      const parsedVersion = parseInt(repoVersion.replaceAll('\n', ''));

      if (UI.VERSION.VERSION_CHECK < parsedVersion) {
        console.log('new update!');
        this.newUpdate = true;
      }
    })();
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped></style>
<!-- STYLE -->
