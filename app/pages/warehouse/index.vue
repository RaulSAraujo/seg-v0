<script setup lang="ts">
useHead({
  titleTemplate: `Almoxarifados - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/almoxarifados",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ALMOXARIFADOS</span>

    <UiFilter />

    <UiTable show-select multi-sort />
  </div>
</template>
