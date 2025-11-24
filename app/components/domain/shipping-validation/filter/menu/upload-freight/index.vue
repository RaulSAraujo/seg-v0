<script setup lang="ts">
import { mergeProps } from "vue";
import Exemple from "./Example.vue";

const { $customFetch } = useNuxtApp();
const loading = useLoadingIndicator();

const file = ref();
const dialog = ref(false);

const importCarrier = async () => {
  try {
    loading.start();

    const formData = new FormData();
    formData.append("freightTable", file.value);

    await $customFetch("shipping-validation/upload-freight-table-to-gateway", {
      method: "POST",
      body: formData,
    });

    $toast().success("Tabela de frete importada com sucesso!");

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-dialog v-model="dialog" width="30vw">
    <template #activator="{ props: propsDialog }">
      <v-tooltip
        location="top"
        text="IMPORTAÇÃO DE TABELA DE FRETE"
        content-class="bg-blue"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="mergeProps(tooltip, propsDialog)"
            icon="mdi-truck-fast"
            class="text-blue"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="IMPORTAÇÃO DE TABELA DE FRETE" rounded="xl">
        <template #append>
          <Exemple />
        </template>

        <template #text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Somente arquivos CSV, XLS, XLSX"
            accept=".csv,.xlsx,.xls"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
          />
        </template>

        <template #actions>
          <v-spacer />

          <v-btn block color="primary" variant="flat" @click="importCarrier">
            IMPORTAR
          </v-btn>

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
