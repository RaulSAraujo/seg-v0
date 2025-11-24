<script lang="ts" setup>
import FindByInvoice from "./FindByInvoice.vue";

const { params } = useRoute();

const purchaseReturnStore = usePurchaseReturnStore();
const { form, formProduct, createAt } = storeToRefs(purchaseReturnStore);

const dayjs = useDayjs();

if (!params.id) {
  createAt.value = dayjs().format("DD/MM/YYYY");
}
</script>

<template>
  <v-row dense>
    <v-col cols="12" sm="6" lg="2">
      <UiDatePicker
        v-model="createAt"
        label="Data criação"
        :clearable="true"
        :multiple="false"
        disabled
      />
    </v-col>

    <v-col v-if="!params.id" cols="12" sm="6" lg="3">
      <FindByInvoice />
    </v-col>

    <v-col v-else cols="12" sm="6" lg="3">
      <UiTextField v-model="formProduct.invoice" label="Nota fiscal" disabled />
    </v-col>

    <v-col cols="12" sm="4" lg="3">
      <UiTextField v-model="form.supplier" label="Fornecedor" />
    </v-col>

    <v-col cols="12" sm="4" lg="2">
      <UiDatePicker
        v-model="form.invoice_issuance_date"
        label="Data emissão"
        :clearable="true"
        :multiple="false"
        :disabled="true"
        @save="form.invoice_issuance_date = dayjs($event).format('DD/MM/YYYY')"
      />
    </v-col>

    <v-col cols="12" sm="4" lg="2">
      <UiSwitch
        v-model="form.priority"
        label="Prioridade"
        class="d-flex flex-row justify-center border-sm rounded-lg"
      />
    </v-col>
  </v-row>
</template>
