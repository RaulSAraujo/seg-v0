<script setup lang="ts">
useHead({
  titleTemplate: `Estoque fiscal - %s`,
});

definePageMeta({
  path: "/estoque-fiscal",
})
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary"> ESTOQUE FISCAL </span>

    <UiFilter />

    <UiTable />
  </div>
</template>
