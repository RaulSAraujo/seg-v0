<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { totalWithoutShipping } = storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex mb-4">
    <span class="text-body-1 font-weight-medium text-primary">
      TOTAL PRODUTO:
    </span>

    <UiToLocaleString class="mx-2" :value="totalWithoutShipping ?? 0.0" />
  </div>
</template>
