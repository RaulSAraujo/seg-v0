<script setup lang="ts">
useHead({
  titleTemplate: `Validação de estoque virtual - %s`,
});

definePageMeta({
  path: "/validacao-de-estoque-virtual",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">
      VALIDAÇÃO DE ESTOQUE VIRTUAL
    </span>

    <ValidateStockVirtualFilter />

    <ValidateStockVirtualTable />
  </div>
</template>
