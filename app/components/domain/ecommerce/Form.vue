<script lang="ts" setup>
import type { Form } from "~/interfaces/Ecommerce";

defineProps<{
  title: string;
  methodRest: "POST" | "PUT";
}>();

defineEmits(["close", "update"]);

const form = reactive<Form>({
  id: undefined,
  web_ecommerce_id: null,
  erp_ecommerce_id: null,
  name: "",
  code: "",
  consumer_key: "",
  consumer_secret: "",
  price_percentage: "",
  profit_margin: "",
  url: "",
  active: false,
  virtual_stock: false,
  information_source: false,
});

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <UiTextField v-model="form.web_ecommerce_id" label="Id ecommerce" />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="form.erp_ecommerce_id"
            label="Id ecommerce erp"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.profit_margin" label="Margem lucro min" />
        </v-col>

        <v-col cols="12">
          <UiTextField
            v-model="form.price_percentage"
            label="Percentual de acréscimo"
          />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.consumer_key" label="Consumer key" />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.consumer_secret" label="Consumer secret" />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.code" label="Código" />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.url" label="Url" />
        </v-col>

        <v-col cols="12">
          <UiTextField v-model="form.name" label="Loja" />
        </v-col>

        <v-col cols="12">
          <UiSwitch v-model="form.active" label="Ativo" />
        </v-col>

        <v-col cols="12">
          <UiSwitch v-model="form.virtual_stock" label="Estoque virtual" />
        </v-col>

        <v-col cols="12">
          <UiSwitch
            v-model="form.information_source"
            label="Origem informações"
          />
        </v-col>
      </v-row>
    </template>

    <template #actions>
      <v-spacer />

      <EcommerceSaveButton
        :method-rest="methodRest"
        :form="form"
        @update="$emit('update', $event)"
        @close="$emit('close')"
      />

      <v-spacer />
    </template>
  </v-card>
</template>
