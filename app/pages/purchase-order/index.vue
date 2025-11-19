<script setup lang="ts">
useHead({
  titleTemplate: `Pedido de compra - %s`,
});

definePageMeta({
  path: "/pedido-de-compra",
});
</script>

<template>
  <div class="mt-5">
    <PurchaseOrderSuppliersGroupButton />

    <PurchaseOrderFilter />

    <PurchaseOrderTable />

    <PurchaseOrderGlobalEdit />

    <PurchaseOrderFilterMenuImportXmlEventSource />
  </div>
</template>
