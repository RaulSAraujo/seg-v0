<script setup lang="ts">
useHead({
  titleTemplate: `Clientes - %s`,
});

definePageMeta({
  path: "/clientes",
});
</script>

<template>
  <div class="mt-5" rounded="t-xl" elevation="5">
    <span class="ml-5 text-h6 text-primary">CLIENTES</span>

    <ClientFilter />

    <ClientTable />
  </div>
</template>
