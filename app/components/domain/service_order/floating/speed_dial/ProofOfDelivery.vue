<script lang="ts" setup>
const { $customFetch, $config } = useNuxtApp();

const { params } = useRoute();

const othersStore = useServiceOrderOthersStore();
const { othersData } = storeToRefs(othersStore);

const generatePdf = async () => {
  try {
    const res = await $customFetch<{ url: string }>("service-order/generate-pdf", {
      method: "POST",
      body: {
        id: params.id,
        pdfType: "createPdfDeliveryReceipt",
      },
    });

    window?.open(`${$config.public.base_url_local}${res.url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <div>
    <v-tooltip
      location="left"
      :text="
        othersData.apparatus_delivery_at != ''
          ? 'Comprovante de entrega'
          : 'Data de entrega invalida'
      "
      :content-class="
        othersData.apparatus_delivery_at != ''
          ? 'bg-cyan text-white'
          : 'bg-red text-white'
      "
    >
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-text-box-minus"
          :color="othersData.apparatus_delivery_at != '' ? 'cyan' : 'red'"
          class="text-white"
          @click="othersData.apparatus_delivery_at != '' ? generatePdf() : null"
        />
      </template>
    </v-tooltip>
  </div>
</template>
