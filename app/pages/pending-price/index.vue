<script setup lang="ts">
useHead({
  titleTemplate: `Pendencia de preço - %s`,
});

definePageMeta({
  path: "/pendencia-de-preco",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PENDENCIA DE PREÇO</span>

    <PendingPriceFilter />

    <PendingPriceTable />
  </div>
</template>
