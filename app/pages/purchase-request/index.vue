<script setup lang="ts">
useHead({
  titleTemplate: `Solicitação de compra - %s`,
});

definePageMeta({
  path: "/solicitacao-de-compra",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">SOLICITAÇÃO DE COMPRA</span>

    <PurchaseRequestFilter />

    <PurchaseRequestTable />
  </div>
</template>
