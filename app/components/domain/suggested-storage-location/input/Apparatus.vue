<script lang="ts" setup>
import type { Supplier, Row } from "~/interfaces/Supplier";

const { data, status } = $api<Row[]>("suggested-storage-location/apparatus", {
  key: "apparatus",
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
    label="Aparelho"
    :items="data ?? []"
    item-title="apparatus_name"
    item-value="apparatus_name"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
