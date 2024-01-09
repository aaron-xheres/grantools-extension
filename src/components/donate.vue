<!-- TEMPLATE -->
<template>
  <n-card>
    <n-button @click="openDonateLink">Donate spark funds? :></n-button>
  </n-card>
</template>
<!-- TEMPLATE -->

<!-- SCRIPT -->
<script lang="ts">
import {defineComponent} from 'vue';
import {NCard, NButton} from 'naive-ui';

export default defineComponent({
  name: 'DonateComponent',
  components: {
    NCard,
    NButton,
  },
  methods: {
    openDonateLink: (): void => {
      window.open('https://www.paypal.com/paypalme/aaronxheres');
    },
  },
});
</script>
<!-- SCRIPT -->

<!-- STYLE -->
<style scoped></style>
<!-- STYLE -->
