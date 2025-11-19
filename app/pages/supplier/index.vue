<script setup lang="ts">
useHead({
  titleTemplate: `Fornecedores - %s`,
});

definePageMeta({
  path: "/fornecedor",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">FORNECEDORES</span>

    <SupplierFilter @active="dialog = true" />

    <SupplierTable />

    <SupplierCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
