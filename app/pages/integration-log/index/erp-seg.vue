<script setup lang="ts">
useHead({
  titleTemplate: `Fila erp-seg - %s`,
});

definePageMeta({
  path: "/log-integracoes/erp-seg",
});
</script>

<template>
  <div class="mt-5">
    <UiFilter />

    <UiTable />
  </div>
</template>
