<script setup lang="ts">
import type { SalesOrdersProductsSeparation } from "~/interfaces/SalesOrderSeparation";

defineOptions({
  name: "SeparationRequestsTableProduct",
});

defineProps<{
  items: SalesOrdersProductsSeparation[];
}>();

interface Headers {
  title: string;
  key: string;
  width?: number | string;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Código fabricante", key: "name" },
  { title: "Destino ERP", key: "type_destination_erp" },
  { title: "Custo", key: "cost" },
  { title: "Preço ERP", key: "price_erp" },
  { title: "Margem ERP", key: "gross_margin_erp" },
  { title: "Margem venda", key: "gross_margin_order" },
  { title: "Promoção", key: "is_promotion", align: "center" },
  { title: "Quantidade vendida", key: "sold_quantity", align: "center" },
  { title: "Validado", key: "validated", align: "center" },
  { title: "Pendencia", key: "Validation_required" },
  { title: "Dt limite envio", key: "sending_limit_at" },
]);
</script>

<template>
  <v-data-table
    :items="items"
    item-key="id"
    :headers="headers"
    hide-default-footer
    disable-sort
    items-per-page="-1"
    density="compact"
  >
    <template #item.cost="{ item }">
      <UiToLocaleString :value="item.cost" />
    </template>

    <template #item.price_erp="{ item }">
      <UiToLocaleString :value="item.price_erp" />
    </template>

    <template #item.is_promotion="{ item }">
      <UiCheckIcon :value="item.is_promotion" readonly />
    </template>

    <template #item.validated="{ item }">
      <UiCheckIcon :value="item.validated" readonly />
    </template>
  </v-data-table>
</template>
