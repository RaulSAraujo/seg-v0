<script lang="ts" setup>
import type { Form } from "~/interfaces/TablePrice";

defineProps<{
  title: string;
}>();

defineEmits(["save"]);

const form = reactive<Form>({
  name: "",
  max_price: 0,
  min_price: 0,
  percentage: 0,
});

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField v-model="form.name" label="Nome" />
        </v-col>

        <v-col cols="12">
          <UiCurrencyField v-model="form.max_price" label="Preço máximo" />
        </v-col>

        <v-col cols="12">
          <UiCurrencyField v-model="form.min_price" label="Preço mínimo" />
        </v-col>

        <v-col cols="12">
          <UiNumberInput
            v-model="form.percentage"
            label="Porcentagem"
            suffix="%"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        class="mb-2"
        color="primary"
        width="8vw"
        variant="flat"
        text="SALVAR"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>
