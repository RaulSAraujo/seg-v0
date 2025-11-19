<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const tableStore = useTableStore();
const { selected } = storeToRefs(tableStore);

const totalItems = computed(() => {
  const rows = selected.value as unknown as Row[];

  return rows.reduce((acc, curr) => acc + curr.quantity_purchased, 0);
});
</script>

<template>
  <span class="mx-1"> Total items: {{ totalItems }} </span>
</template>
