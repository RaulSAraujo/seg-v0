<script lang="ts" setup>
import type { Users } from "~/interfaces/User";

const { data, status } = $api<{ id: number; name: string }[]>(
  "service-order/user?group_id=5&active=true&full=false",
  {
    key: "group-id-5",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    transform: (fetchData) => {
      return (fetchData as unknown as Users).rows.map((e) => ({
        id: e.id,
        name: e.name.toUpperCase(),
      }));
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
    item-value="id"
  />
</template>
