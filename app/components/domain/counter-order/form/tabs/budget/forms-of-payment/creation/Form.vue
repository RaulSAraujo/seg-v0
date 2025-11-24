<script lang="ts" setup>
import ErpOperators from "./input/ErpOperators.vue";
import PaymentMethods from "./input/PaymentMethods.vue";

defineOptions({
  name: "CounterOrderBudgetFormsOfPaymentCreationForm",
});

const { $dayjs } = useNuxtApp();

const counterOrderStore = useCounterOrderStore();
const { operators } = storeToRefs(counterOrderStore);

const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const { form } = storeToRefs(counterOrderPaymentsStore);

const disabledErpOperators = computed(
  () =>
    form.value.payments_methods_id != 3 && form.value.payments_methods_id != 6
);

watch(
  () => form.value.payments_methods_id,
  (payment) => {
    if (payment) {
      if (payment != 3 && payment != 6) {
        operators.value = null;
      }
    }
  }
);
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <PaymentMethods v-model="form.payments_methods_id" />
    </v-col>

    <v-col cols="12">
      <UiCurrencyField
        v-model="form.payment_value"
        label="Valor do pagamento"
      />
    </v-col>

    <v-col cols="12">
      <UiDatePicker
        v-model="form.effective_date"
        label="Data pagamento"
        :clearable="false"
        :multiple="false"
        @save="form.effective_date = $dayjs($event).format('DD/MM/YYYY')"
      />
    </v-col>

    <v-col cols="12">
      <ErpOperators v-model="operators" :disabled="disabledErpOperators" />
    </v-col>

    <v-col cols="12">
      <UiTextField v-model="form.authorization" label="Autorização" />
    </v-col>
  </v-row>
</template>
