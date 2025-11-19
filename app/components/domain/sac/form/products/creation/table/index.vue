<script lang="ts" setup>
import DialogQuantity from "./DialogQuantity.vue";

import type { Header } from "~/interfaces/Header";
import type { RowWithRelationship } from "~/interfaces/Product";

defineProps<{
  products: RowWithRelationship[];
  loading: boolean;
}>();

defineEmits(["add"]);

const headers = ref<Header[]>([
  { title: "Ações", key: "actions" },
  { title: "Cód. fabricante", key: "name" },
  { title: "Cód. auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Pref. venda", key: "preferential_sales", align: "center" },
  { title: "Estoque", key: "stock", align: "center" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "price" },
]);

const dialog = ref(false);
const selectItem = ref<RowWithRelationship>({} as RowWithRelationship);

const activeDialog = (item: RowWithRelationship) => {
  selectItem.value = item;
  dialog.value = true;
};
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
        @click="activeDialog(item)"
      />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="25" />
    </template>

    <template #item.preferential_sales="{ item }">
      <div v-if="item.Family.product_id == item.id">
        <v-tooltip
          location="bottom"
          text="Pref. Venda"
          content-class="bg-green"
        >
          <template #activator="{ props }">
            <v-icon
              v-bind="props"
              icon="mdi-circle"
              size="15"
              :style="{
                background: 'radial-gradient(circle, #4CAF50, #8BC34A)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
              }"
            />
          </template>
        </v-tooltip>
      </div>
    </template>

    <template #item.cost="{ item }">
      <UiToLocaleString :value="item.cost" />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString :value="item.price" />
    </template>
  </v-data-table>

  <DialogQuantity
    v-model="dialog"
    @close="dialog = false"
    @add="$emit('add', { item: selectItem, quantity: $event })"
  />
</template>
