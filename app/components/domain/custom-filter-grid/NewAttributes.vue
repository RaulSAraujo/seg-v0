<script lang="ts" setup>
const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const get = async () => {
  loading.start();

  try {
    await $customFetch("custom-filters/sync-model-attributes", {
      method: "POST",
    });

    $toast().success("Novos atributos carregados com sucesso.");

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="CARREGAR NOVOS ATRIBUTOS"
    content-class="bg-light-green text-white"
  >
    <template #activator="{ props: tooltip }">
      <v-btn v-bind="tooltip" icon="mdi-new-box" class="text-light-green" @click="get" />
    </template>
  </v-tooltip>
</template>
