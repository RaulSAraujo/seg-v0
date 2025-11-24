<script setup lang="ts">
const props = defineProps<{
  saleId: number | string;
}>();

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const { capitalizeFirstLetter } = useCapitalize();

const sinc = async () => {
  loading.value = true;

  try {
    const { message } = await $customFetch<{ message: string }>(
      "sales-order/sync-tax-data",
      {
        method: "POST",
        query: {
          ecom_order_id: props.saleId,
        },
      }
    );

    $toast().success(message);

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${capitalizeFirstLetter(err.data.error) ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-tooltip location="top" text="SINCRONIZAR DADOS FISCAIS" content-class="bg-red">
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-file-refresh"
        variant="plain"
        size="small"
        color="red"
        density="comfortable"
        :loading="loading"
        @click="sinc"
      />
    </template>
  </v-tooltip>
</template>
