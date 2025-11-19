<script setup lang="ts">
import type { Row } from "~/interfaces/SalesOrder";
defineProps<{
  items: Row[];
}>();

const headers = ref([
  { title: "TAGS", key: "tag_id" },
  { title: "NF", key: "invoice" },
  { title: "PEDIDO", key: "sale_id" },
  { title: "DATA/HORA", key: "created_at" },
  { title: "USUARIO", key: "user" },
  { title: "STATUS INI.", key: "initial_status" },
  { title: "STATUS FIN.", key: "status" },
  { title: "REF", key: "produto_chave" },
  {
    title: "DESCRIÇÃO",
    key: "description",
  },
  { title: "VENDEDOR", key: "seller" },
  { title: "CLIENTE", key: "customer" },
  { title: "LOCAL/VENDA", key: "poin_sale" },
  { title: "TRANSPORTADORA", key: "collect_company" },
  { title: "ENVIO", key: "shipment_mode" },
  { title: "RASTREIO", key: "tracking_id" },
  { title: "COLETADO", key: "collected" },
]);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    disable-sort
    items-per-page="-1"
    hide-default-footer
    density="compact"
  >
    <template #item.tag_id="{ item }">
      <TemplatesTags :tags="item.tag_id" />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.initial_status="{ item }">
      <UiTooltip :text="item.initial_status" :vw="5" />
    </template>

    <template #item.status="{ item }">
      <UiTooltip :text="item.status" :vw="5" />
    </template>

    <template #item.user="{ item }">
      <UiTooltip :text="item.user" :vw="5" />
    </template>

    <template #item.seller="{ item }">
      <UiTooltip :text="item.seller" :vw="5" />
    </template>

    <template #item.customer="{ item }">
      <UiTooltip :text="item.customer" :vw="5" />
    </template>

    <template #item.poin_sale="{ item }">
      <UiTooltip :text="item.poin_sale" :vw="5" />
    </template>

    <template #item.shipment_mode="{ item }">
      <UiTooltip :text="item.shipment_mode" :vw="5" />
    </template>

    <template #item.tracking_id="{ item }">
      <UiTooltip :text="item.tracking_id" :vw="5" />
    </template>

    <template #item.collect_company="{ item }">
      <UiTooltip :text="item.collect_company" :vw="6" />
    </template>

    <template #item.collected="{ item }">
      <UiCheckIcon :value="!item.collected" readonly />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString :date="item.created_at" />
    </template>
  </v-data-table>
</template>
