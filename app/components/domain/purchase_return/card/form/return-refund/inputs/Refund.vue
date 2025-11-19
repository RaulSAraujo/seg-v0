<script lang="ts" setup>
const { data, status } = $api<string[]>("purchase-return/get-refund-statuses", {
  key: "purchase-return-refund-statuses",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Status reembolso"
    :items="data ?? []"
    hide-details="auto"
  />
</template>
