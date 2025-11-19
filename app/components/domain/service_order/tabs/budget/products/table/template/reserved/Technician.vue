<script lang="ts" setup>
import type { Users, Row } from "~/interfaces/User";

const { data, status } = $api<Row[]>(
  "service-order/user?group_id=5&active=true&full=false",
  {
    key: "group-id-5",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    transform: (fetchData) => {
      return (fetchData as unknown as Users).rows;
    },
  }
);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Técnico"
    :items="data ?? []"
    item-title="name"
    item-value="name"
  />
</template>
