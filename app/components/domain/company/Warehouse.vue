<script lang="ts" setup>
import type {
  ERPWarehouses,
  Row,
} from "~/interfaces/ErpWarehouses";
const { data, status } = $api<Row[]>("company/erp-warehouse", {
  key: "erp-warehouse",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as ERPWarehouses).rows;
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Armazém"
    :items="data ?? []"
    item-title="descricao"
    item-value="codigo"
  />

  <v-skeleton-loader v-else type="text" />
</template>
