<script lang="ts" setup>
import { exempleSpreadsheetForMinimumStock } from "~/services/minimum-stock.service";

const loading = ref(false);

const exampleWorksheet = async () => {
  try {
    loading.value = true;

    await exempleSpreadsheetForMinimumStock();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
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
