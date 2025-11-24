<script lang="ts" setup>
import Submit from "./Submit.vue";
import { exempleSpreadsheetForStockMovement } from "~/services/stock-movement-analysis.service";

defineOptions({
  name: "MinimumStockCreationForm",
});

defineEmits(["close"]);

const file = ref<File>({} as File);

const loading = ref(false);

const exampleWorksheet = async () => {
  try {
    loading.value = true;

    await exempleSpreadsheetForStockMovement();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-card title="IMPORTAÇÃO ESTOQUE MÍNIMO" rounded="xl">
    <template #append>
      <v-tooltip
        location="top"
        text="Planilha de exemplo"
        content-class="bg-primary"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="tooltip"
            icon="mdi-file-excel"
            variant="plain"
            density="compact"
            class="text-primary"
            :loading="loading"
            @click="exampleWorksheet"
          />
        </template>
      </v-tooltip>
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
