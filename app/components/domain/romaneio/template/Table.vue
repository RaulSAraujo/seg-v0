<script setup lang="ts">
import type { SalesOrder } from "~/interfaces/SalesCollections";

defineProps<{
  salesOrders: SalesOrder[];
}>();

type Header = {
  title: string;
  key: string;
  align?: "start" | "end" | "center";
  sortable?: boolean;
};

const headers = ref<Header[]>([
  { title: "Pedido", key: "sale_id" },
  { title: "Data/Hora", key: "created_at" },
  { title: "Usuário", key: "user" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "Descrição", key: "description" },
  { title: "Vendedor", key: "seller" },
  { title: "Local/venda", key: "poin_sale" },
  { title: "Transportadora", key: "collect_company" },
  { title: "Envio", key: "shipment_mode" },
  { title: "Nota fiscal", key: "invoice" },
  { title: "Tray coletado", key: "verified_status_ecom", align: "center" },
  { title: "Envio atrasado", key: "shipping_delayed", align: "center" },
  { title: "Motivo do atraso", key: "delay_reason", align: "center" },
]);
</script>

<template>
  <v-data-table
    :items="salesOrders"
    :headers="headers"
    disable-sort
    disable-filtering
    disable-pagination
    density="compact"
    items-per-page="-1"
    hide-default-footer
  >
    <template #item.verified_status_ecom="{ item }">
      <UiCheckIcon :value="item.verified_status_ecom" :readonly="true" />
    </template>

    <template #item.customer="{ item }">
      <UiTooltip :text="item.customer" :vw="5" />
    </template>

    <template #item.user="{ item }">
      <UiTooltip :text="item.user" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.collect_company="{ item }">
      <UiTooltip :text="item.collect_company" :vw="5" />
    </template>

    <template #item.shipment_mode="{ item }">
      <UiTooltip :text="item.shipment_mode" :vw="5" />
    </template>

    <template #item.poin_sale="{ item }">
      <UiTooltip :text="item.poin_sale" :vw="5" />
    </template>

    <template #item.seller="{ item }">
      <UiTooltip :text="item.seller" :vw="5" />
    </template>

    <template #item.tracking_id="{ item }">
      <UiTooltip :text="item.tracking_id" :vw="5" />
    </template>

    <template #item.shipping_delayed="{ item }">
      <ShippingUrgencyTemplateDelayed :delayed="item.shipping_delayed" />
    </template>

    <template #item.delay_reason="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.delay_reason"
        :vw="5"
        attr="delay_reason"
        url="sales-order"
        @update-text="item.delay_reason = $event"
      />
    </template>

    <template #item.created_at="{ item }">
      <UiDateString
        :date="item.created_at"
        format-for="DD/MM/YYYY HH:mm:ss"
        format-from="YYYY-MM-DDTHH:mm:ss"
      />
    </template>
  </v-data-table>
</template>
