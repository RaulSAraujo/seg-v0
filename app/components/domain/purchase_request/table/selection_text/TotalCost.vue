<script setup lang="ts">
import type { Row } from "~/interfaces/PurchaseRequest";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const valueTotal = computed(() =>
  (selected.value as unknown as Row[]).reduce(
    (acc, curr) => acc + parseFloat(curr.cost) * curr.quantity_purchased,
    0.0
  )
);
</script>

<template>
  <span class="mx-1">Total:</span>

  <UiToLocaleString :value="valueTotal" class="mx-1" />
</template>
