<script lang="ts" setup>
import { persistFile } from "~/services/minimum-stock.service";
import { useEventSourceMinimumStock } from "../../composables/useEventSource";

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

    const res = await persistFile(props.file);

    useEventSourceMinimumStock().setupEventSource(res.filePath);

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
