<script lang="ts" setup>
import Status from "./status/index.vue";
import Tribute from "./Tribute.vue";
import FormOfPayment from "./FormOfPayment.vue";
import FormOfPaymentTribute from "./FormOfPaymentTribute.vue";

import type { Header } from "~/interfaces/Header";
import type {
  ImportOrdersProduct,
  Response,
} from "~/interfaces/ImportOrders";

defineProps<{
  importOrdersProducts: ImportOrdersProduct[];
}>();

defineOptions({
  name: "OrderImportTableProducts",
});

const headers: Header[] = [
  { title: "Ações", key: "action" },
  { title: "Id", key: "id" },
  { title: "Id do Pedido", key: "order_id" },
  { title: "Pedido Fornecedor", key: "platform_order_number" },
  { title: "Código Fabricante", key: "name" },
  { title: "Descrição", key: "description" },
  { title: "Custo Unitário", key: "unit_cost" },
  { title: "Custo + Tributo", key: "taxed_cost" },
  { title: "Tributo", key: "tribute" },
  { title: "Custo Total", key: "total_cost" },
  { title: "Quant. Comprada", key: "quantity_purchased", align: "center" },
  { title: "Quant. Finalidade", key: "reserved_quantity", align: "center" },
  { title: "Finalidade", key: "reservation" },
  { title: "Código de Rastreio", key: "tracking_code" },
  { title: "Data de Recebimento", key: "receipt_date" },
  { title: "Data Limite de Garantia", key: "limit_warranty_date" },
  { title: "Status", key: "status" },
  { title: "Forma de Pagamento", key: "form_of_payment" },
  { title: "Forma de Pagamento do Tributo", key: "form_of_payment_tribute" },
  { title: "Observação", key: "observation" },
];

const update = (res: Response, item: ImportOrdersProduct) => {
  Object.entries(res.result.product_updated).forEach(([key, value]) => {
    if (key in item) {
      (item as unknown as Record<string, unknown>)[key] = value;
    }
  });
};
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="importOrdersProducts"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
  >
    <template #item.action="{ item }">
      <UiDelete
        :id="item.id"
        url-local="import-orders/import-orders-products"
      />
    </template>

    <template #item.name="{ item }">
      <span class="text-truncate">{{ item.name }}</span>
    </template>

    <template #item.description="{ item }">
      <UiTooltip :text="item.description" :vw="5" />
    </template>

    <template #item.total_cost="{ item }">
      <UiToLocaleString :value="item.total_cost" />
    </template>

    <template #item.unit_cost="{ item }">
      <UiToLocaleString :value="item.unit_cost" />
    </template>

    <template #item.taxed_cost="{ item }">
      <UiToLocaleString :value="item.taxed_cost" />
    </template>

    <template #item.tribute="{ item }">
      <Tribute
        :id="item.id"
        :tribute="item.tribute"
        @update="update($event, item)"
      />
    </template>

    <template #item.reserved_quantity="{ item }">
      <UiEditDialogNumber
        :id="item.id"
        :value="item.reserved_quantity"
        attr="reserved_quantity"
        url="import-orders/import-orders-products"
        @update-text="item.reserved_quantity = $event"
      />
    </template>

    <template #item.reservation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.reservation"
        :vw="5"
        attr="reservation"
        url="import-orders/import-orders-products"
        @update-text="item.reservation = $event"
      />
    </template>

    <template #item.tracking_code="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.tracking_code"
        :vw="5"
        attr="tracking_code"
        url="import-orders/import-orders-products"
        @update-text="item.tracking_code = $event"
      />
    </template>

    <template #item.limit_warranty_date="{ item }">
      <UiDateString :date="item.limit_warranty_date" />
    </template>

    <template #item.receipt_date="{ item }">
      <UiEditDialogDate
        :id="item.id"
        :date="item.receipt_date?.toLocaleString() || ''"
        attr="receipt_date"
        url="import-orders/import-orders-products"
        :clearable="true"
        @update-text="item.receipt_date = $event"
      />
    </template>

    <template #item.status="{ item }">
      <Status
        :id="item.id"
        :status="item.status"
        @update-status="item.status = $event"
        @update-receipt-date="item.receipt_date = $event"
      />
    </template>

    <template #item.form_of_payment="{ item }">
      <FormOfPayment
        :id="item.id"
        :form-of-payment="item.form_of_payment"
        @update-text="item.form_of_payment = $event"
      />
    </template>

    <template #item.form_of_payment_tribute="{ item }">
      <FormOfPaymentTribute
        :id="item.id"
        :form-of-payment-tribute="item.form_of_payment_tribute"
        @update-text="item.form_of_payment_tribute = $event"
      />
    </template>

    <template #item.observation="{ item }">
      <UiEditDialogString
        :id="item.id"
        :text="item.observation"
        :vw="5"
        attr="observation"
        url="import-orders/import-orders-products"
        @update-text="item.observation = $event"
      />
    </template>
  </v-data-table>
</template>
