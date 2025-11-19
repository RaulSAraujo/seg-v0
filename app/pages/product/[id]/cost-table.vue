<script setup lang="ts">
definePageMeta({
  path: "/produto-compra/:id/tabela-de-custos",
});
</script>

<template>
  <div>
    <v-toolbar title="TABELA DE CUSTOS" rounded="t-xl" />

    <v-container fluid>
      <ProductCostTable />

      <ProductCostTableMyTable />
    </v-container>

    <v-toolbar title="PERCENTUAIS FISCAIS / VALORES FISCAIS" />

    <v-container fluid>
      <ProductCostTableInvoice />
    </v-container>
  </div>
</template>
