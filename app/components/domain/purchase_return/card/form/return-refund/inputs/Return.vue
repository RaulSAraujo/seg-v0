<script lang="ts" setup>
const { data, status } = $api<string[]>("purchase-return/get-return-statuses", {
  key: "purchase-return-return-statuses",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Status devolução"
    :items="data ?? []"
    hide-details="auto"
  />
</template>
