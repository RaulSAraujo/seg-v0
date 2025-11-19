<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { totalValueProducts } = storeToRefs(sacMetricsStore);
</script>

<template>
  <div class="d-flex">
    <span class="text-body-1 font-weight-medium text-primary mr-2">
      SUBTOTAL:
    </span>

    <UiToLocaleString :value="totalValueProducts" />
  </div>
</template>
