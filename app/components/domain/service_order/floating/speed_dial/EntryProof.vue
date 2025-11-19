<script lang="ts" setup>
const { $customFetch, $config } = useNuxtApp();

const { params } = useRoute();

const generatePdf = async () => {
  try {
    const res = await $customFetch<{ url: string }>("service-order/generate-pdf", {
      method: "POST",
      body: {
        id: params.id,
        pdfType: "createPdfEntryReceipt",
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
    <v-tooltip text="Comprovante de entrada" content-class="bg-cyan text-white">
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          icon="mdi-text-box-plus"
          color="cyan"
          class="text-white"
          @click="generatePdf"
        />
      </template>
    </v-tooltip>
  </div>
</template>
