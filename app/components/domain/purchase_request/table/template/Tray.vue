<script setup lang="ts">
import { getTrayOrderLink } from "~/services/purchase-request.service";

defineOptions({
  name: "PurchaseRequestTableTray",
});

const props = defineProps<{
  saleId: string;
}>();

const loading = ref(false);

const redirectTray = async () => {
  try {
    const saleId = props.saleId.replace("ID.", "");

    loading.value = true;

    const url = await getTrayOrderLink(saleId);

    window?.open(`${url}`, "_blank");
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
    icon="mdi-home-export-outline"
    variant="plain"
    size="small"
    color="blue"
    density="comfortable"
    :loading="loading"
    :disabled="!saleId.includes('ID') || saleId.replace('ID.', '').length > 7"
    @click="redirectTray"
  />
</template>
