<script lang="ts" setup>
const { data } = $api<{ id: number; description: string }[]>(
  "stock-transfer/get-request-reasons",
  {
    key: "stock-transfer-request-reasons",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiCombobox
    v-if="data"
    label="Motivo da requisição"
    :items="data"
    item-title="description"
    item-value="id"
  />
</template>
