<script lang="ts" setup>
import { secondStepExample } from "~/services/quotation.service";

defineOptions({
  name: "QuotationImportQuotationExample",
});

const { $config } = useNuxtApp();
const loading = useLoadingIndicator();

const exemple = async () => {
  try {
    loading.start();

    const filePath = await secondStepExample();

    const link = document.createElement("a");
    link.href = `${$config.public.base_url_local}${filePath}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-btn
    text="Baixe o exemplo aqui"
    variant="plain"
    size="x-small"
    color="primary"
    @click="exemple"
  />
</template>
