<script lang="ts" setup>
import Delete from "./template/Delete.vue";

defineOptions({
  name: "CounterOrderBudgetFormsOfPaymentTable",
});

const headers = [
  { title: "Ações", key: "actions" },
  { title: "Forma de pagamento", key: "erp_payment_id" },
  { title: "Data do pagamento", key: "effective_date" },
  { title: "Valor do pagamento", key: "payment_value" },
  { title: "Operadora", key: "operator_id" },
  { title: "Autorização", key: "authorization" },
];

const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const { payments } = storeToRefs(counterOrderPaymentsStore);
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="payments"
    disable-sort
    hide-default-footer
    density="compact"
    class="mb-5 bg-transparent"
    items-per-page="-1"
  >
    <template #item.actions="{ item, index }">
      <Delete
        :id="item.id"
        :index="index"
        @remove="payments.splice($event, 1)"
      />
    </template>

    <template #item.erp_payment_id="{ item }">
      <span>{{ item.erp_payment_name || item.erp_payment_id }}</span>
    </template>

    <template #item.effective_date="{ item }">
      <UiDateString :date="item.effective_date" />
    </template>

    <template #item.operator_id="{ item }">
      <span v-if="item.operator_id != 0">
        {{ item.erp_operator_name || item.operator_id }}
      </span>
    </template>

    <template #item.payment_value="{ item }">
      <UiToLocaleString :value="item.payment_value" />
    </template>
  </v-data-table>
</template>
