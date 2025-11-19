<script setup lang="ts">
import type { StockMovementHistory } from "~/interfaces/StockMovementHistory";

useHead({
  titleTemplate: `Histórico de movimentação - %s`,
});

definePageMeta({
  path: "/produto-venda/:id/historico-de-movimentacao",
});

const { params } = useRoute();

const headers = [
  { title: "Referência", key: "produto_chave" },
  { title: "Código fabricante", key: "name" },
  { title: "Tipo de movimentação", key: "type_movement" },
  { title: "Custo", key: "cost" },
  { title: "Entrada", key: "input" },
  { title: "Saida", key: "output" },
  { title: "Saldo", key: "balance" },
  { title: "Data da movimentação", key: "date_movement" },
];

const { status, data } = await $api<StockMovementHistory>(
  "product/stock-movement-history",
  {
    query: {
      produto_chave: params.id,
    },
  }
);
</script>

<template>
  <div class="rounded-xl">
    <v-toolbar title="HISTÓRICO DE MOVIMENTAÇÃO" rounded="t-xl" class="mb-5" />

    <v-data-table
      :headers="headers"
      :items="data?.rows"
      items-per-page="-1"
      multi-sort
      hide-default-footer
      :loading="status === 'pending'"
      class="pb-5"
    >
      <template #item.date_movement="{ item }">
        <UiDateString
          :date="item.date_movement"
          format-for="DD/MM/YYYY HH:mm:ss"
          format-from="YYYY-MM-DDTHH:mm:ss"
        />
      </template>

      <template #item.cost="{ item }">
        <UiToLocaleString :value="item.cost" />
      </template>
    </v-data-table>
  </div>
</template>

<style>
.background-color-dark-history-movement {
  background-color: rgb(39, 39, 39);
}

.background-color-light-history-movement {
  background-color: rgb(243, 243, 243);
}
</style>
