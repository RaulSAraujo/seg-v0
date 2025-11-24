<script lang="ts" setup>
const { data, status } = $api<string[]>("purchase-return/get-warehouses", {
  key: "purchase-return-warehouses",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Almoxarifado"
    :items="data ?? []"
    hide-details="auto"
  />
</template>
