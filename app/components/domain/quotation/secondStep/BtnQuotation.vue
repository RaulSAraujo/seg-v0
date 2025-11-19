<script lang="ts" setup>
import { secondStep } from "~/services/quotation.service";

const props = defineProps<{
  file: File;
}>();

const emit = defineEmits(["close"]);

const loading = ref(false);
const quotationStore = useQuotationStore();

const quotation = async () => {
  loading.value = true;

  try {
    const res = await secondStep(props.file);

    quotationStore.setupEventSource(res.filePath);

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="d-flex justify-space-around">
    <v-btn
      text="SALVAR COTAÇÃO"
      color="primary"
      :disabled="file == undefined"
      :loading="loading"
      @click="quotation"
    />
  </div>
</template>
