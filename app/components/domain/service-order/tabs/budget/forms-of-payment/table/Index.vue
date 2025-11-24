<script lang="ts" setup>
import { useOSPaymentsApi } from "~/services/service_order.service/useServiceOrderPaymentsApi";

defineOptions({
  name: "ServiceOrderTabsBudgetFormsOfPaymentTable",
});

const headers = [
  { title: "Ações", key: "actions" },
  { title: "Forma de pagamento", key: "erp_payment_id" },
  { title: "Data do pagamento", key: "effective_date" },
  { title: "Valor do pagamento", key: "payment_value" },
  { title: "Operadora", key: "operator_id" },
  { title: "Autorização", key: "authorization" },
];

const { remove } = useOSPaymentsApi();

const paymentsStore = useServiceOrderPaymentsStore();
const { serviceOrderPayments } = storeToRefs(paymentsStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="serviceOrderPayments"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5"
    items-per-page="-1"
    height="120"
    fixed-header
    style="
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
  >
    <template #item.actions="{ item }">
      <UiDelete function-external @remove="remove(item.id)" />
    </template>

    <template #item.erp_payment_id="{ item }">
      <span v-if="item.ErpPaymentsMethods">
        {{ item.ErpPaymentsMethods[0]?.payment || item.erp_payment_id }}
      </span>
    </template>

    <template #item.effective_date="{ item }">
      <UiDateString :date="item.effective_date" />
    </template>

    <template #item.operator_id="{ item }">
      <span v-if="item.operator_id != 0 && item.ErpOperators">
        {{ item.ErpOperators[0]?.name || item.operator_id }}
      </span>
    </template>

    <template #item.payment_value="{ item }">
      <UiToLocaleString :value="item.payment_value" />
    </template>
  </v-data-table>
</template>
