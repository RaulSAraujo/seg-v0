<script lang="ts" setup>
const { $dayjs } = useNuxtApp();

const serviceOrderStore = useServiceOrderInvoiceStore();
const { invoiceData } = storeToRefs(serviceOrderStore);

const { isDate, brDate } = useDateConversion();

if (!isDate(`${invoiceData.value.bought_at}`)) {
  invoiceData.value.bought_at = brDate(`${invoiceData.value.bought_at}`);
}
</script>

<template>
  <v-row dense>
    <v-col cols="2">
      <ServiceOrderInputSupplier />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputApparatus />
    </v-col>

    <v-col cols="3">
      <ServiceOrderInputModel />
    </v-col>

    <v-col cols="3">
      <ServiceOrderInputSerial />
    </v-col>

    <v-col cols="2">
      <ServiceOrderInputVersion />
    </v-col>

    <v-col cols="12">
      <ServiceOrderInputDefectDescription />
    </v-col>

    <v-col cols="6">
      <ServiceOrderInputApparatusCondition />
    </v-col>

    <v-col cols="6">
      <ServiceOrderInputAcessories />
    </v-col>

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
</template>
