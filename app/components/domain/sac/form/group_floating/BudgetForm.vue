<script setup lang="ts">
const { params } = useRoute();

const loading = useLoadingIndicator();

const { $customFetch, $config } = useNuxtApp();

const generatePdf = async () => {
  loading.start();

  try {
    const res = await $customFetch<{ url: string }>("sac-sale/generate-pdf", {
      method: "POST",
      body: {
        params: {
          sacSaleId: params.id,
        },
      },
    });

    window?.open(`${$config.public.base_url_local}${res.url}`, "_blank");

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <ClientOnly>
    <v-tooltip location="left" text="FICHA DE ORÇAMENTO" content-class="bg-primary">
      <template #activator="{ props: tooltip }">
        <v-fab
          v-bind="tooltip"
          icon="mdi-printer"
          color="primary"
          class="button"
          style="position: fixed; bottom: 150px; right: 15px"
          @click="generatePdf"
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
