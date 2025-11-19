<script setup lang="ts">
import type { ImportOrdersProduct } from "~/interfaces/ImportOrders";

defineOptions({
  name: "OrderImportCreationTable",
});

const props = defineProps<{
  items: ImportOrdersProduct[];
}>();

const itemsComputed = computed(() => props.items);

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
}

const headers = ref<Headers[]>([
  { title: "Ações", key: "action" },
  { title: "Código de fabricante", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "Quantidade comprada", key: "quantity_purchased", align: "center" },
  { title: "Quantidade finalidade", key: "reserved_quantity", align: "center" },
  { title: "Finalidade", key: "reservation" },
  { title: "Custo total", key: "total_cost", align: "center" },
  { title: "Forma de Pgto", key: "form_of_payment" },
  { title: "Pedido Fornecedor", key: "platform_order_number" },
]);
</script>

<template>
  <v-data-table
    :items="itemsComputed"
    :headers="headers"
    height="60vh"
    items-per-page="-1"
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
        @click="itemsComputed.splice(index, 1)"
      />
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.total_cost="{ item }">
      <UiToLocaleString :value="item.total_cost" />
    </template>

    <template #item.platform_order_number="{ item }">
      <UiEditDialogString
        :text="item.platform_order_number"
        :vw="5"
        :export-save="true"
        @export-save="item.platform_order_number = $event"
      />
    </template>
  </v-data-table>
</template>
