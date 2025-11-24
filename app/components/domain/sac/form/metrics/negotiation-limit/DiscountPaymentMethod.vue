<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { discountPayment, discountPaymentPercent } =
  storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex">
    <span>Desc. forma de pgto:</span>

    <UiToLocaleString class="mx-1" :value="discountPayment" />

    <span>{{ discountPaymentPercent }}%</span>
  </div>
</template>
