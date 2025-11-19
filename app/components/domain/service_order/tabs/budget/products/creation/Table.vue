<script lang="ts" setup>
import type { Row } from "~/interfaces/Product";

defineProps<{
  products: Row[];
  loading: boolean;
}>();

defineEmits(["add"]);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Ações", key: "actions" },
  { title: "Cód. fabricante", key: "name" },
  { title: "Cód. auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Estoque", key: "quantity", align: "center" },
  { title: "Custo", key: "cost" },
]);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :loading="loading"
    items-per-page="-1"
    hide-default-footer
    disable-sort
  >
    <template #item.actions="{ item }">
      <v-btn
        icon="mdi-plus"
        variant="plain"
        size="small"
        color="primary"
        density="comfortable"
        @click="$emit('add', item)"
      />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="25" />
    </template>

    <template #item.cost="{ item }">
      <UiToLocaleString :value="item.cost" />
    </template>
  </v-data-table>
</template>
