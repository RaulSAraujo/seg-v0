<script lang="ts" setup>
import { useOSPaymentsApi } from "~/services/service_order.service/useServiceOrderPaymentsApi";
import type { ErpOperators } from "~/interfaces/ErpOperators";
import type { ServiceOrderPaymentForm } from "~/interfaces/ServiceOrder";

defineOptions({
  name: "ServiceOrderTabsBudgetFormsOfPaymentCreation",
});

const { params } = useRoute();
const { $dayjs } = useNuxtApp();
const loading = useLoadingIndicator();

const { create } = useOSPaymentsApi();

const form = reactive<ServiceOrderPaymentForm>({
  erp_payment_id: null,
  payment_value: "",
  effective_date: null,
  authorization: "",
});

const operators = ref<ErpOperators | null>(null);

const save = async () => {
  try {
    loading.start();

    await create(params.id as string, {
      operator_id: operators.value?.CODIGO,
      bank_id: operators.value?.BANCO,
      account_id: operators.value?.CONTA,
      ...form,
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const close = () => {
  form.erp_payment_id = null;
  form.payment_value = "";
  form.effective_date = null;
  form.authorization = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="300px"
    @after-leave="close"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        color="primary"
        text="Adicionar pagamento"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="NOVO PAGAMENTO" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <ServiceOrderTabsBudgetFormsOfPaymentCreationErpPayments
                v-model="form.erp_payment_id"
              />
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
                @save="
                  form.effective_date = $dayjs($event).format('DD/MM/YYYY')
                "
              />
            </v-col>

            <v-col cols="12">
              <ServiceOrderTabsBudgetFormsOfPaymentCreationErpOperators
                v-model="operators"
                :disabled="form.erp_payment_id != 2 && form.erp_payment_id != 6"
              />
            </v-col>

            <v-col cols="12">
              <UiTextField v-model="form.authorization" label="Autorização" />
            </v-col>
          </v-row>
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="
              save();

              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
