<script lang="ts" setup>
import type { Region, Row } from "~/interfaces/Region";

const { data, status } = $api<Row[]>("companies", {
  key: "companies",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as Region).rows;
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Empresa"
    :items="data ?? []"
    item-title="fantasy_name"
    item-value="erp_id"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
