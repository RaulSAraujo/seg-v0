<script setup lang="ts">
useHead({
  titleTemplate: `Seo p/ categoria - %s`,
});

definePageMeta({
  path: "/seo-categoria",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">SEO P/ CATEGORIA</span>

    <ProductTemplateFilter @active="dialog = true" />

    <ProductTemplateTable />

    <ProductTemplateCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
