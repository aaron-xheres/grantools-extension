<!-- TEMPLATE -->
<template>
  <div>
    <button @click="helloFromExtension">Hello</button>
  </div>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {actionStore} from '@/stores/actionStores';
import {dataStore} from '@/stores/dataStores';

import {helloFromExtension} from '@/functions';

export default {
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
};
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style></style>
<!-- STYLE -->
