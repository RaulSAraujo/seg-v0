<script setup lang="ts">
useHead({
  titleTemplate: `Controle de caixa - %s`,
});

definePageMeta({
  path: "/controle-caixa",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">CONTROLE DE CAIXA</span>

    <CashControlFilter />

    <CashControlTable />

    <CashControlCreation />

    <CashControlCloseCash />

    <CashControlReport />
  </div>
</template>
