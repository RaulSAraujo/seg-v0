<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { discountShipment, discountShipmentPercent } =
  storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex">
    <span>Desc. frete:</span>

    <UiToLocaleString class="mx-1" :value="discountShipment" />

    <span>{{ discountShipmentPercent }}%</span>
  </div>
</template>
