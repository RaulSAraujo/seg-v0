<script setup lang="ts">
useHead({
  titleTemplate: `Aparelhos à venda - %s`,
});

definePageMeta({
  path: "/aparelhos-venda",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">APARELHOS À VENDA</span>

    <SellDeviceFilter />

    <SellDeviceTable />
  </div>
</template>
