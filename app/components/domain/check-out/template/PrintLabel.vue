<script setup lang="ts">
const props = defineProps<{
  saleId: number | string;
}>();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const printer = async () => {
  loading.value = true;

  try {
    await $customFetch("sales-order/print-shipping-label", {
      query: {
        ecom_order_id: props.saleId,
      },
      retry: 0,
    });

    $toast().success("Impressão concluída.");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="GERAR ETIQUETA"
    style="
      --v-theme-surface-variant: 33, 150, 243;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-printer"
        variant="plain"
        size="small"
        color="blue"
        density="comfortable"
        :loading="loading"
        @click="printer"
      />
    </template>
  </v-tooltip>
</template>
