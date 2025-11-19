<script setup lang="ts">
useHead({
  titleTemplate: `Salvados - %s`,
});

definePageMeta({
  path: "/salvados",
});
</script>

<template>
  <div class="mt-5" rounded="t-xl" elevation="5">
    <span class="ml-5 text-h6 text-primary">SALVADOS</span>

    <SavedRmaFilter />

    <SavedRmaTable />
  </div>
</template>
