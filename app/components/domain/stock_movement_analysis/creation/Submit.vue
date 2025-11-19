<script lang="ts" setup>
import { importStockMovement } from "~/services/stock-movement-analysis.service";

defineOptions({
  name: "MinimumStockCreationSubmit",
});

const props = defineProps<{
  file: File;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);

const importationOfAnalysis = async () => {
  try {
    loading.value = true;

    await importStockMovement(props.file);

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    text="IMPORTAR"
    color="primary"
    :disabled="file == undefined"
    :loading="loading"
    @click="importationOfAnalysis"
  />
</template>
