<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

const props = defineProps<{
  products: Row[];
}>();

const totalItems = computed(() => {
  return props.products.reduce((acc, curr) => acc + curr.quantity_purchased, 0);
});
</script>

<template>
  <span class="mx-1"> QUANTIDADE TOTAL: {{ totalItems }} </span>
</template>
