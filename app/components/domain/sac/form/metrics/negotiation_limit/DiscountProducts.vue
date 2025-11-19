<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { discountProductFloat, discountProductPercentFloat } =
  storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex">
    <span>Desc. produto:</span>

    <UiToLocaleString class="mx-1" :value="discountProductFloat" />

    <span>{{ discountProductPercentFloat }}%</span>
  </div>
</template>
