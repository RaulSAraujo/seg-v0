<script setup lang="ts">
useHead({
  titleTemplate: `Análise de movimentação de estoque - %s`,
});

definePageMeta({
  path: "/analise-de-movimentacao-de-estoque",
});

const dialog = ref<boolean>(false);
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">
      ANÁLISE DE MOVIMENTAÇÃO DE ESTOQUE
    </span>

    <StockMovementAnalysisFilter @active="dialog = true" />

    <StockMovementAnalysisTable />

    <StockMovementAnalysisCreation v-model="dialog" @close="dialog = false" />
  </div>
</template>
