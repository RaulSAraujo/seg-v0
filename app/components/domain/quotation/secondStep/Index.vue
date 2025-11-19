<script setup lang="ts">
import BtnExemple from "./BtnExample.vue";
import BtnQuotation from "./BtnQuotation.vue";

defineOptions({
  name: "QuotationImportQuotation",
});

const file = ref();

const resetProps = () => {
  file.value = undefined;
};
</script>

<template>
  <v-dialog width="30vw" @after-leave="resetProps">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        text="2º IMPORTAR COTAÇÃO"
        color="primary"
        class="mr-2"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="2º IMPORTAR COTAÇÃO" rounded="xl">
        <template #subtitle>
          <BtnExemple />
        </template>

        <template #text>
          <v-file-input
            v-model="file"
            color="primary"
            label="Arquivo com códigos na 1º coluna"
            accept=".csv,.xlsx,.xls,.xlsb"
            placeholder="Selecione seu arquivo"
            prepend-inner-icon="mdi-paperclip"
            prepend-icon=""
          />
        </template>

        <template #actions>
          <BtnQuotation :file="file" @close="isActive.value = false" />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
