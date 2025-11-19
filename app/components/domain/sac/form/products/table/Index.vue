<script lang="ts" setup>
import type { SacSaleProduct } from "~/interfaces/SacSale";

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Ações", key: "actions" },
  { title: "Código de fabricante", key: "manufacturer_code" },
  { title: "Código auxiliar", key: "auxiliary_code" },
  { title: "Descrição", key: "description" },
  { title: "Aparelho", key: "device" },
  { title: "Quantidade", key: "quantity", align: "center" },
  { title: "Preço", key: "price" },
  { title: "Valor total", key: "total" },
];

const sacProductsStore = useSacProductsStore();
const { products } = storeToRefs(sacProductsStore);

const itemRowBackground = (row: { item: SacSaleProduct }) => {
  if (!row.item.is_valid_margin) {
    return {
      class: "active-custom-color",
    };
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="products"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
    :row-props="itemRowBackground"
    style="background-color: transparent"
  >
    <template #item.actions="{ index }">
      <v-btn
        icon="mdi-delete"
        variant="plain"
        size="small"
        color="pink"
        density="comfortable"
        @click="sacProductsStore.remove(index)"
      />
    </template>

    <template #item.price="{ item }">
      <UiToLocaleString :value="item.price" />
    </template>

    <template #item.total="{ item }">
      <UiToLocaleString :value="item.total" />
    </template>
  </v-data-table>
</template>

<style>
.active-custom-color {
  color: red;
}
</style>
