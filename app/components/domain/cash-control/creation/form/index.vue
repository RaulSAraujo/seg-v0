<script lang="ts" setup>
import Type from "./Type.vue";
import Payments from "./Payments.vue";

import type { Form } from "~/interfaces/CashControl";

defineOptions({
  name: "CashControlCreationForm",
});

const props = defineProps<{
  form: Form;
}>();

const formComputed = computed(() => props.form);
</script>

<template>
  <v-row dense>
    <v-col cols="12">
      <Type v-model="formComputed.type" />
    </v-col>

    <v-col cols="12">
      <UiTextField v-model="formComputed.description" label="Descrição" />
    </v-col>

    <v-col cols="12">
      <Payments v-model="formComputed.payment_form" />
    </v-col>

    <v-col cols="12">
      <UiCurrencyField v-model="formComputed.value" label="Valor" />
    </v-col>
  </v-row>
</template>
