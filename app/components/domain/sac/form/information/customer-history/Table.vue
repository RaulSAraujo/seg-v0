<script lang="ts" setup>
import type { Order } from "~/interfaces/CustomerHistory";

defineProps<{
  orders: Order[];
  loading: boolean;
}>();

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
};

const headers: Header[] = [
  { title: "Pedido", key: "ecom_order_id" },
  { title: "Data", key: "date" },
  { title: "Valor total", key: "total" },
  { title: "Local da venda", key: "point_sale" },
];
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    density="compact"
    class="mb-5"
    items-per-page="-1"
    :loading="loading"
    disable-sort
    hide-default-footer
    height="150px"
    fixed-header
    style="
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
  >
    <template #item.date="{ item }">
      <UiDateString :date="item.date" />
    </template>

    <template #item.total="{ item }">
      <UiToLocaleString :value="item.total" />
    </template>
  </v-data-table>
</template>
