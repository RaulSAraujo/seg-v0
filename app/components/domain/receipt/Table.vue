<script lang="ts" setup>
import type { Row } from "~/interfaces/PurchaseControlProduct";

defineProps<{
  items: Row[];
  loading: boolean;
}>();

interface Headers {
  title: string;
  key: string;
  align?: "start" | "center" | "end";
}

const headers: Headers[] = [
  { title: "NFs", key: "invoice" },
  { title: "Pedido erp", key: "erp_order" },
  { title: "Código", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "Qtd compra", key: "quantity_purchased", align: "center" },
  { title: "Qtd final", key: "quantity_reserved", align: "center" },
  { title: "Qtd recebimento", key: "receiving_quantity", align: "center" },
  { title: "Finalidade", key: "reservation" },
  { title: "Data recebimento", key: "receiving_at" },
  { title: "Medida", key: "measure", align: "center" },
  { title: "Imagem", key: "image", align: "center" },
  { title: "Suporte", key: "support", align: "center" },
  { title: "Concluído", key: "concluded", align: "center" },
  {
    title: "Localização temporária",
    key: "temporary_location",
    align: "center",
  },
  { title: "Data limite", key: "sending_limit_at" },
];

const theme = useTheme();

const itemRowBackground = (row: { index: number }) => {
  if (row.index % 2 === 0) {
    return {
      class: theme.current.value.dark
        ? "background-color-dark-in-receipt"
        : "background-color-light-in-receipt",
    };
  }
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="items"
    density="compact"
    items-per-page="-1"
    :loading="loading"
    loading-text="Loading... Please wait"
    multi-sort
    hide-default-footer
    :row-props="itemRowBackground"
  >
    <template #item.receiving_quantity="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.receiving_quantity"
        attr="receiving_quantity"
        url="receivement/purchase-control-product"
        @update-text="item.receiving_quantity = $event"
      />
    </template>

    <template #item.concluded="{ item }">
      <ReceiptTemplateConcluded
        :quantity-purchased="item.quantity_purchased"
        :receiving-quantity="item.receiving_quantity"
      />
    </template>

    <template #item.name="{ item }">
      <UiTooltip :text="item.name" :vw="5" />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.measure="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.measure"
        url="receivement/purchase-control-product"
        @update-value="item.measure = $event"
      />
    </template>

    <template #item.image="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.image ?? false"
        url="receivement/purchase-control-product"
        @update-value="item.image = $event"
      />
    </template>

    <template #item.support="{ item }">
      <UiCheckIcon
        :id="item.id"
        :value="item.support"
        url="receivement/purchase-control-product"
        @update-value="item.support = $event"
      />
    </template>

    <template #item.receiving_at="{ item }">
      <UiDateString :date="item.receiving_at" />
    </template>

    <template #item.sending_limit_at="{ item }">
      <UiDateString :date="item.sending_limit_at" />
    </template>

    <template #item.temporary_location="{ item }">
      {{ item.temporary_location?.join(",") }}
    </template>
  </v-data-table>
</template>

<style>
.background-color-dark-in-receipt {
  background-color: rgb(39, 39, 39);
}

.background-color-light-in-receipt {
  background-color: rgb(243, 243, 243);
}

.background-color-in-active {
  background-color: teal;
}
</style>
