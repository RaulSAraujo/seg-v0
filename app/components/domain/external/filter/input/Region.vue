<script lang="ts" setup>
import type { Region, Row } from "~/interfaces/Region";

const { data, status } = $api<Row[]>("external-service-report/region", {
  key: "region",
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
    label="Região"
    :items="data ?? []"
    item-title="region"
    item-value="region"
    :multiple="true"
    :clearable="true"
  />
</template>
