<script setup lang="ts">
useHead({
  titleTemplate: `Local de armazenagem - %s`,
});

definePageMeta({
  path: "/local-armazenagem",
})
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">LOCAL DE ARMAZENAGEM</span>

    <UiFilter />

    <UiTable />
  </div>
</template>
