<script setup lang="ts">
useHead({
  titleTemplate: `Pedido importação - %s`,
});

definePageMeta({
  path: "/pedido-importacao",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PEDIDO IMPORTAÇÃO</span>

    <OrderImportFilter />

    <OrderImportTable />
  </div>
</template>
