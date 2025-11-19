<script lang="ts" setup>
import Submit from "./Submit.vue";
import ExempleSpreadsheet from "./ExempleSpreadsheet.vue";

defineOptions({
  name: "MinimumStockCreationForm",
});

defineEmits(["close"]);

const file = ref<File>({} as File);
</script>

<template>
  <v-card title="IMPORTAÇÃO ESTOQUE MÍNIMO" rounded="xl">
    <template #append>
      <ExempleSpreadsheet />
    </template>

    <template #text>
      <v-file-input
        v-model="file"
        color="primary"
        label="Arquivo com referencias na 1º coluna"
        accept=".csv,.xlsx,.xls,.xlsb"
        placeholder="Selecione seu arquivo"
        prepend-inner-icon="mdi-paperclip"
        prepend-icon=""
      />
    </template>

    <template #actions>
      <Submit :file="file" @close="$emit('close')" />
    </template>
  </v-card>
</template>
