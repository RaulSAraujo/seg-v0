<script lang="ts" setup>
import Form from "./Form.vue";
import ButtonSave from "./ButtonSave.vue";

defineOptions({
  name: "CounterOrderBudgetFormsOfPaymentCreation",
});

const dayjs = useDayjs();

const dialog = ref(false);

const counterOrderStore = useCounterOrderStore();
const { operators } = storeToRefs(counterOrderStore);

const counterOrderPaymentsStore = useCounterOrderPaymentsStore();
const { form: formPayment } = storeToRefs(counterOrderPaymentsStore);

const clear = () => {
  formPayment.value.payments_methods_id = null;
  formPayment.value.payment_value = "";
  formPayment.value.effective_date = null;
  formPayment.value.authorization = "";
  operators.value = null;
};

watch(
  () => dialog.value,
  (active) => {
    if (active) {
      formPayment.value.effective_date = dayjs().format("DD/MM/YYYY");
    }
  }
);
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="300px"
    transition="dialog-top-transition"
    @after-leave="clear"
  >
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        color="primary"
        text="ADD"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default>
      <v-card title="NOVO PAGAMENTO" rounded="xl">
        <template #text>
          <Form />
        </template>

        <template #actions>
          <v-spacer />

          <ButtonSave @close="dialog = false" />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
