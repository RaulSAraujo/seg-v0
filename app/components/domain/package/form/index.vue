<script lang="ts" setup>
import Submit from "./Submit.vue";
import type { Row } from "~/interfaces/Package";

defineOptions({
  name: "PackageForm",
});

const props = defineProps<{
  form: Row;
  title: string;
  method: "POST" | "PUT";
}>();

const formComputed = computed(() => props.form);

defineEmits(["close"]);
</script>

<template>
  <v-card :title="title" rounded="xl">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField
            v-model="formComputed.name"
            label="Nome"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.weight_cubic_kg"
            label="Peso cúbico"
            :min="0"
            :step="0.01"
            :precision="2"
            :hide-details="true"
          />
        </v-col>

        <!-- <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.weight_per_cubic_kg"
            label="Peso por metro cúbico"
            :min="0"
            :step="0.01"
            :precision="2"
            :disabled="true"
            :hide-details="true"
          />
        </v-col> -->

        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.package_weight"
            label="Peso do pacote"
            :min="0"
            :step="0.01"
            :precision="2"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.width"
            label="Largura"
            :min="0"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.height"
            label="Altura"
            :min="0"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiNumberInput
            v-model="formComputed.length"
            label="Comprimento"
            :min="0"
            :hide-details="true"
          />
        </v-col>

        <v-col cols="12">
          <UiSwitch
            v-model="formComputed.custom"
            label="Personalizado"
            :hide-details="true"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <Submit :method="method" :form="form" @close="$emit('close')" />

      <v-spacer />
    </template>
  </v-card>
</template>
