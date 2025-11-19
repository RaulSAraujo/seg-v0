<script lang="ts" setup>
import type { Supplier, Row } from "~/interfaces/Supplier";

const { data, status } = $api<Row[]>("suggested-storage-location/supplier", {
  key: "supplier",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as Supplier).rows;
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Marca"
    :items="data ?? []"
    item-title="name"
    item-value="name"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
