<script lang="ts" setup>
import type { Form } from "~/interfaces/InputMaterials";

defineOptions({
  name: "InsumosForm",
});

const props = defineProps<{
  form: Form;
}>();

const formComputed = computed(() => props.form);

const paymentsMethods = [
  "CCPJ",
  "CCPJ + MP",
  "MP",
  "BOLETO",
  "DINHEIRO",
  "PIX",
  "OUTROS",
];
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <UiTextArea
        v-model="formComputed.description"
        label="DESCRIÇÃO"
        auto-grow
      />
    </v-col>

    <v-col cols="12">
      <UiTextField v-model="formComputed.finality" label="FINALIDADE" />
    </v-col>

    <v-col cols="12">
      <UiNumberInput
        v-model="formComputed.quantity_purchase"
        label="QUANTIDADE"
      />
    </v-col>

    <v-col cols="12">
      <UiSelect
        v-model="formComputed.payment_method"
        label="PAGAMENTO"
        :items="paymentsMethods"
      />
    </v-col>

    <v-col cols="12">
      <UiTextField v-model="formComputed.observation" label="OBSERVAÇÃO" />
    </v-col>
  </v-row>
</template>
