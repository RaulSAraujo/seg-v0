<script lang="ts" setup>
const sacMetricsStore = useSacMetricsStore();
const { totalWithShipping } = storeToRefs(sacMetricsStore);
</script>

<template>
  <div
    class="d-flex justify-space-between bg-green rounded-lg px-5 py-3"
    style="width: 320px"
  >
    <span class="text-body-1 font-weight-black"> TOTAL ORÇAMENTO: </span>

    <UiToLocaleString
      class="mx-2 font-weight-black"
      :value="totalWithShipping ?? 0.0"
    />
  </div>
</template>
