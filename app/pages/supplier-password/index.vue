<script setup lang="ts">
useHead({
  titleTemplate: `Senhas de fornecedor - %s`,
});

definePageMeta({
  path: "/senhas-fornecedores",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">SENHAS DE FORNECEDOR</span>

    <SupplierPasswordFilter />

    <SupplierPasswordTable />
  </div>
</template>
