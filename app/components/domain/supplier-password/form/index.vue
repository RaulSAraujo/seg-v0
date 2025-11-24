<script lang="ts" setup>
import Supplier from "./Supplier.vue";

import type { Form } from "~/interfaces/SupplierPasswords";

defineOptions({
  name: "SupplierPasswordForm",
});

defineProps<{
  title: string;
  loading: boolean;
}>();

defineEmits(["save"]);

const form = reactive<Form>({
  supplier: undefined,
  supplier_username: "",
  supplier_password: "",
});

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <v-row dense>
        <v-col cols="12">
          <Supplier v-model="form.supplier" />
        </v-col>
        <v-col cols="12">
          <UiTextField
            v-model="form.supplier_username"
            label="Nome de usuário no fornecedor"
          />
        </v-col>
        <v-col cols="12">
          <UiTextField
            v-model="form.supplier_password"
            v-maska="''"
            label="Senha de usuário no fornecedor"
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
        :loading="loading"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>
