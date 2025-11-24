<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const invoiceStore = useServiceOrderInvoiceStore();
const { invoiceData } = storeToRefs(invoiceStore);
</script>

<template>
  <v-card title="FISCAL" subtitle="Dados fiscais do aparelho">
    <v-row dense>
      <v-col>
        <UiTextField v-model="invoiceData.resale" label="Revenda" />
      </v-col>

      <v-col>
        <UiTextField v-model="invoiceData.invoice" label="Nota fiscal" />
      </v-col>

      <v-col>
        <UiDatePicker
          v-model="invoiceData.bought_at"
          label="Data da compra"
          :multiple="false"
          :clearable="true"
          @save="invoiceData.bought_at = $dayjs($event).format('DD/MM/YYYY')"
        />
      </v-col>

      <v-col>
        <UiCurrencyField
          v-model="invoiceData.apparatus_value"
          label="Valor do produto"
        />
      </v-col>

      <v-col>
        <UiTextField v-model="invoiceData.extended_warranty" label="GE" />
      </v-col>
    </v-row>
  </v-card>
</template>
