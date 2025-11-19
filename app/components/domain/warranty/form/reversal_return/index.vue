<script lang="ts" setup>
import Account from "./input/Account.vue";

import type { Row } from "~/interfaces/Warranty";

defineOptions({
  name: "WarrantyReversalReturn",
});

const props = defineProps<{
  orders: Row;
}>();

const { $dayjs } = useNuxtApp();

const ordersComput = computed(() => props.orders);
</script>

<template>
  <div class="mt-5 mb-2">
    <span class="text-h6">DADOS DO ESTORNO/DEVOLUÇÃO</span>
  </div>

  <v-row dense>
    <v-col cols="2">
      <UiDatePicker
        v-model="ordersComput.dtestorno"
        label="Data estorno"
        :multiple="false"
        :clearable="true"
        @save="ordersComput.dtestorno = $dayjs($event).format('DD/MM/YYYY')"
      />
    </v-col>

    <v-col cols="3">
      <Account v-model="ordersComput.conta_devolucao" />
    </v-col>

    <v-col cols="2">
      <UiTextField
        v-model="ordersComput.notafiscal_devolucao"
        label="Nota dev."
      />
    </v-col>

    <v-col cols="1">
      <UiTextField
        v-model="ordersComput.n_serie_devolucao"
        label="Serie dev."
      />
    </v-col>

    <v-col cols="2">
      <UiDatePicker
        v-model="ordersComput.dtnotafiscal_devolucao"
        label="Data nota dev."
        :multiple="false"
        :clearable="true"
        @save="
          ordersComput.dtnotafiscal_devolucao =
            $dayjs($event).format('DD/MM/YYYY')
        "
      />
    </v-col>

    <v-col cols="2">
      <v-checkbox
        v-model="ordersComput.estorno_credito"
        label="Estorno realizado ?"
        density="compact"
        color="primary"
        hide-details
      />
    </v-col>
  </v-row>
</template>
