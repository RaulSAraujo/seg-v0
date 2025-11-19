<script lang="ts" setup>
import type { Supplier, Row } from "~/interfaces/Supplier";

defineOptions({
  name: "SupplierForm",
});

const { data, status } = await $api<Row[]>("supplier", {
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
    label="Fornecedor"
    :items="data ?? []"
    item-title="name"
    item-value="name"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
