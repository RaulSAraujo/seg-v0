<script setup lang="ts">
useHead({
  titleTemplate: `Estoque mínimo - %s`,
});

definePageMeta({
  path: "/estoque-minimo",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">ESTOQUE MÍNIMO</span>

    <MinimumStockFilter @active="dialog = true" />

    <MinimumStockTable />

    <MinimumStockCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
