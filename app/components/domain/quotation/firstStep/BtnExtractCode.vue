<script lang="ts" setup>
import { firstStep } from "~/services/quotation.service";

const props = defineProps<{
  file: File;
  code: string;
}>();

const emit = defineEmits(["filePath"]);

const loading = ref(false);

const extract = async () => {
  try {
    loading.value = true;

    const res = await firstStep(props.file, props.code);

    emit("filePath", res.result.file.replace("family-products", "temp-excel"));

    $toast().success("Sucesso em extrair os códigos.");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-btn
    color="primary"
    text="EXTRAIR CÓDIGOS"
    :loading="loading"
    @click="extract"
  />
</template>
