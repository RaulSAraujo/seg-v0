<script setup lang="ts">
useHead({
  titleTemplate: `Produto venda - %s`,
});

definePageMeta({
  path: "/produto-venda",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PRODUTO VENDA</span>

    <UiFilter />

    <ProductSellTable />
  </div>
</template>
