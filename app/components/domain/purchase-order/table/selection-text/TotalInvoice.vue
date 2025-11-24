<script setup lang="ts">
import type { Row } from "~/interfaces/PurchaseControlProduct";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const valueTotal = computed(() => {
  const rows = selected.value as unknown as Row[];

  return rows.reduce(
    (acc, curr) =>
      acc + parseFloat(curr.invoice_cost) * curr.quantity_purchased,
    0.0
  );
});
</script>

<template>
  <span class="mx-1">Total NF:</span>

  <UiToLocaleString :value="valueTotal" class="mx-1" />
</template>
