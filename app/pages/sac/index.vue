<script setup lang="ts">
useHead({
  titleTemplate: `Vendas sac - %s`,
});

definePageMeta({
  path: "/vendas-sac",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">VENDAS SAC</span>

    <SacFilter />

    <SacTable />
  </div>
</template>
