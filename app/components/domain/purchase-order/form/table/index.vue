<script setup lang="ts">
import Delete from "./Delete.vue";

import type { Row } from "~/interfaces/PurchaseControlProduct";

defineProps<{
  products: Row[];
}>();

defineEmits(["remove"]);

interface Headers {
  title: string;
  key: string;
  width?: number | string;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Remover", key: "remove" },
  { title: "Qtd compra", key: "quantity_purchased", align: "center" },
  { title: "Qtd finalidade", key: "quantity_reserved", align: "center" },
  { title: "Código de fabricante", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "Código auxiliar", key: "produto_chave" },
  { title: "R$ fornecedor", key: "supplier_cost" },
  { title: "R$ Compra", key: "purchase_cost" },
  { title: "Finalidade", key: "reservation" },
  { title: "Data limite", key: "sending_limit_at" },
]);
</script>

<template>
  <v-data-table
    :items="products"
    item-key="id"
    :headers="headers"
    hide-default-footer
    disable-sort
    items-per-page="-1"
    density="compact"
    return-object
  >
    <template #item.remove="{ item, index }">
      <Delete :item="item" :index="index" @remove="$emit('remove', $event)" />
    </template>

    <template #item.quantity_purchased="{ item }">
      <UiEditDialogNumber
        :value="item.quantity_purchased"
        :export-save="true"
        @export-save="item.quantity_purchased = $event"
      />
    </template>

    <template #item.quantity_reserved="{ item }">
      <UiEditDialogNumber
        :value="item.quantity_reserved"
        :export-save="true"
        @export-save="item.quantity_reserved = $event"
      />
    </template>

    <template #item.purchase_cost="{ item }">
      <UiEditDialogCurrency
        :value="item.purchase_cost"
        :export-save="true"
        @export-save="item.purchase_cost = $event"
      />
    </template>

    <template #item.supplier_cost="{ item }">
      <UiEditDialogCurrency
        :value="item.supplier_cost"
        :export-save="true"
        @export-save="item.supplier_cost = $event"
      />
    </template>

    <template #item.reservation="{ item }">
      <UiEditDialogString
        :text="item.reservation"
        :vw="5"
        :export-save="true"
        @export-save="item.reservation = $event"
      />
    </template>

    <template #item.sending_limit_at="{ item }">
      <UiEditDialogDate
        :date="`${item.sending_limit_at ?? ''}`"
        :clearable="true"
        :export-save="true"
        @export-save="item.sending_limit_at = $event"
      />
    </template>

    <template #no-data>
      <span>Nenhum produto vinculado</span>
    </template>
  </v-data-table>
</template>
