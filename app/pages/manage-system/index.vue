<script setup lang="ts">
useHead({
  titleTemplate: `Sistema - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/gerenciamento",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">GERENCIAMENTO DE SISTEMA</span>

    <UiFilter />

    <UiTable multi-sort />
  </div>
</template>
