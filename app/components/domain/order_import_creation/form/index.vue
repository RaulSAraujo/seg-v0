<script lang="ts" setup>
import type { ImportOrdersProduct } from "~/interfaces/ImportOrders";

defineOptions({
  name: "OrderImportCreationForm",
});

defineProps<{
  items: ImportOrdersProduct[];
}>();

defineEmits(["add"]);
</script>

<template>
  <OrderImportCreationFormProducts @add="$emit('add', $event)" />

  <OrderImportCreationFormTable :items="items" />
</template>
