<script lang="ts" setup>
const { data, status } = $api<string[]>("purchase-return/get-product-types", {
  key: "purchase-return-product-types",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Tipo"
    :items="data ?? []"
    hide-details="auto"
  />
</template>
