<script setup lang="ts">
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  products: Row[];
}>();

const valueTotal = computed(() => {
  return props.products.reduce(
    (acc, curr) =>
      acc + parseFloat(curr.purchase_cost) * curr.quantity_purchased,
    0.0
  );
});
</script>

<template>
  <span class="mx-1">VALOR TOTAL:</span>

  <UiToLocaleString :value="valueTotal" class="mx-1" />
</template>
