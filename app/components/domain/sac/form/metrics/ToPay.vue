<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { toPay } = storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex align-center">
    <span class="text-body-1 font-weight-medium text-primary mr-2">
      A PAGAR:
    </span>

    <UiToLocaleString :value="toPay" />
  </div>
</template>
