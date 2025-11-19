<script setup lang="ts">
useHead({
  titleTemplate: `Fila seg-ecom - %s`,
});

definePageMeta({
  path: "/log-integracoes/seg-ecom",
});
</script>

<template>
  <div class="mt-5">
    <UiFilter />

    <UiTable />
  </div>
</template>
