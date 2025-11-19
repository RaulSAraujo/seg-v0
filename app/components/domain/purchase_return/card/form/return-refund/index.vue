<script lang="ts" setup>
import Refund from "./inputs/Refund.vue";
import Return from "./inputs/Return.vue";

const purchaseReturnStore = usePurchaseReturnStore();
const { form } = storeToRefs(purchaseReturnStore);
</script>

<template>
  <div class="my-5">
    <div class="mb-2">
      <span class="text-h6">DADOS DA DEVOLUÇÃO/REEMBOLSO</span>
    </div>

    <v-row dense>
      <v-col cols="12" sm="6" md="3" lg="1">
        <UiTextField
          v-model="form.solicitation_number"
          label="Numero solicitação"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3" lg="2">
        <UiTextField
          v-model="form.returning_invoice_number"
          label="Nota fiscal Devolução"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3" lg="2">
        <UiDatePicker
          v-model="form.returning_invoice_date"
          label="Data Nota Devolução"
          :multiple="false"
          :clearable="true"
          @save="
            form.returning_invoice_date = $dayjs($event).format('DD/MM/YYYY')
          "
        />
      </v-col>

      <v-col cols="12" sm="6" md="3" lg="2">
        <Return v-model="form.return_status" />
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="1">
        <UiCurrencyField v-model="form.returning_invoice_value" label="Valor" />
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="2">
        <UiDatePicker
          v-model="form.refund_date"
          label="Data Reembolso"
          :clearable="true"
          :multiple="false"
          @save="form.refund_date = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="2">
        <Refund v-model="form.refund_status" />
      </v-col>

      <v-col cols="12">
        <UiTextArea
          v-model="form.observation"
          label="Observação"
          auto-grow
          :rows="1"
        />
      </v-col>
    </v-row>
  </div>
</template>
