<script lang="ts" setup>
import type { Row } from "~/interfaces/Product";

onUnmounted(() => {
  items.value = [];
});

const items = useState<Row[]>("items-stock-transfer", () => []);

const headers = [
  { title: "Ações", key: "action" },
  { title: "Código de barras", key: "ean" },
  { title: "Código fabricante", key: "name" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Quantidade", key: "quantity" },
  { title: "Marca", key: "brand" },
  { title: "Aparelho", key: "apparatus" },
  { title: "Descrição", key: "description" },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    height="60vh"
    disable-sort
    hide-default-footer
  >
    <template #item.action="{ index }">
      <v-btn
        icon="mdi-delete"
        variant="plain"
        size="small"
        color="pink"
        density="comfortable"
        @click="items.splice(index, 1)"
      />
    </template>
  </v-data-table>
</template>
