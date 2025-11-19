<script lang="ts" setup>
import type { Apparatus, Row } from "~/interfaces/Apparatus";

defineOptions({
  name: "ProductTemplateApparatus",
});

const { data, status } = $api<Row[]>("apparatus", {
  key: "apparatus",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as Apparatus).rows;
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Aparelho"
    :items="data ?? []"
    item-title="apparatus_name"
    item-value="id"
  />

  <v-skeleton-loader v-else type="text" />
</template>
