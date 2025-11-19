<script lang="ts" setup>
const { data } = $api<{ id: number; description: string }[]>(
  "stock-transfer/get-warehouses",
  {
    key: "stock-transfer-warehouses",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiCombobox
    v-if="data"
    label="Almoxarifado destino"
    :items="data"
    item-title="description"
    item-value="id"
  />
</template>
