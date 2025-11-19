<script lang="ts" setup>
import Submit from "./Submit.vue";

import type { Form } from "~/interfaces/ShipmentOrders";

defineOptions({
  name: "ShipmentForm",
});

const props = defineProps<{
  form: Form;
  title: string;
  method: "POST" | "PUT";
}>();

const formComputed = computed(() => props.form);

defineEmits(["close"]);
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField
            v-model="formComputed.shipment_company"
            label="Trasportadora"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="formComputed.shipment_mode"
            label="Modo de transporte"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="formComputed.point_sale"
            label="Ponto de venda"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="formComputed.collect_company"
            label="Empresa de coleta"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <Submit :form="formComputed" :method="method" @close="$emit('close')" />

      <v-spacer />
    </template>
  </v-card>
</template>
