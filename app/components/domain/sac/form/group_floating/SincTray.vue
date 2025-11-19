<script setup lang="ts">
const { params } = useRoute();
const loading = useLoadingIndicator();
const { $customFetch } = useNuxtApp();

const sacStore = useSacStore();
const { paymentType, ecomOrderId, exportedTray } = storeToRefs(sacStore);

const sacQuoteFreightStore = useSacQuoteFreightStore();
const { quoteFreight } = storeToRefs(sacQuoteFreightStore);

const sacMetricsStore = useSacMetricsStore();
const { totalValueProducts } = storeToRefs(sacMetricsStore);

const save = async () => {
  loading.start();

  try {
    const res = await $customFetch<{ ecom_order_id: number }>(
      "sac-sale/sync-order-tray",
      {
        method: "POST",
        body: {
          id: params.id,
        },
      }
    );

    ecomOrderId.value = res.ecom_order_id;

    $toast().success("Sincronização concluída.");

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};

watch(
  () => [totalValueProducts.value, quoteFreight.value, paymentType.value],
  () => {
    validateExportedTray();
  }
);

const validateExportedTray = () => {
  if (
    totalValueProducts.value != 0 &&
    quoteFreight.value != undefined &&
    paymentType.value != undefined
  ) {
    exportedTray.value = false;
  } else {
    exportedTray.value = true;
  }
};

validateExportedTray();
</script>

<template>
  <ClientOnly>
    <v-tooltip
      location="left"
      text="SINCRONIZAR PEDIDO TRAY"
      content-class="bg-primary"
    >
      <template #activator="{ props: tooltip }">
        <v-fab
          v-bind="tooltip"
          icon="mdi-reload"
          color="primary"
          class="button"
          :disabled="exportedTray"
          style="position: fixed; bottom: 90px; right: 15px"
          @click="save"
        />
      </template>
    </v-tooltip>
  </ClientOnly>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
