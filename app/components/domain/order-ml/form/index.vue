<script lang="ts" setup>
import Submit from "./Submit.vue";

import type { Form } from "~/interfaces/OrdersMl";

defineOptions({
  name: "OrderMlCreation",
});

const props = defineProps<{
  form: Form;
}>();

defineEmits(["close"]);

const { $dayjs } = useNuxtApp();

const formComputed = computed(() => props.form);

const payments_form = ["CCPJ", "CC PJ + MP", "MP", "BOLETO", "PIX"];

const accounts = [
  "Ecomfacil",
  "Comclick",
  "Loja do Técnico",
  "Origiparts",
  "Outras",
];
</script>

<template>
  <v-card rounded="xl" title="NOVO PEDIDO MERCADO LIVRE">
    <template #text>
      <v-row dense>
        <v-col cols="12" sm="6">
          <UiTextField v-model="formComputed.tracking_code" label="Nº PEDIDO" />
        </v-col>

        <v-col cols="12" sm="6">
          <UiTextField v-model="formComputed.finality" label="FINALIDADE" />
        </v-col>

        <v-col cols="12" sm="8">
          <UiTextField v-model="formComputed.description" label="DESCRIÇÃO" />
        </v-col>

        <v-col cols="12" sm="4">
          <UiNumberInput
            v-model="formComputed.quantity_purchase"
            label="QUANTIDADE"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <UiDatePicker
            v-model="formComputed.review_data"
            label="DATA DE REVISÃO"
            :clearable="false"
            :multiple="false"
            @save="
              formComputed.review_data = $dayjs($event).format('DD/MM/YYYY')
            "
          />
        </v-col>

        <v-col cols="12" sm="6">
          <UiDatePicker
            v-model="formComputed.limit_date"
            label="DATA LIMITE"
            :clearable="false"
            :multiple="false"
            @save="
              formComputed.limit_date = $dayjs($event).format('DD/MM/YYYY')
            "
          />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="formComputed.seller" label="VENDEDOR" />
        </v-col>

        <v-col cols="12" sm="4">
          <UiSelect
            v-model="formComputed.account"
            label="Conta"
            :items="accounts"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <UiCurrencyField
            v-model="formComputed.total_cost"
            label="CUSTO TOTAL"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <UiSelect
            v-model="formComputed.form_payment"
            label="FORMA DE PAGAMENTO"
            :items="payments_form"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="formComputed.observation" label="OBSERVAÇÃO" />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <Submit :form="formComputed" @close="$emit('close')" />

      <v-spacer />
    </template>
  </v-card>
</template>
