<script lang="ts" setup>
import type { Users } from "~/interfaces/User";

const { data, status } = $api<{ name: string }[]>(
  "service-order/user?active=true&full=false",
  {
    key: "users-active",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
    transform: (fetchData) => {
      return (fetchData as unknown as Users).rows.map((e) => ({
        name: e.name.toUpperCase(),
      }));
    },
  }
);
</script>

<template>
  <UiAutoComplete
    v-if="status == 'success'"
    label="Destino"
    :items="data ?? []"
    item-title="name"
    item-value="name"
  />
</template>
