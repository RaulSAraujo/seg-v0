<script lang="ts" setup>
import type { Group, Row } from "~/interfaces/Group";

defineOptions({
  name: "ManageUserGroup",
});

const { data, status } = $api<Row[]>("group", {
  key: "group",
  query: {
    full: false,
  },
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as Group).rows;
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Grupo"
    :items="data ?? []"
    item-title="name"
    item-value="id"
    :multiple="false"
    :clearable="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
