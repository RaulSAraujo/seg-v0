<script lang="ts" setup>
import type { Users, Row } from "~/interfaces/User";

const { data, status } = $api<Row[]>(
  "product-loan/user?active=true&full=false",
  {
    key: "users-active",
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
  <UiCombobox
    v-if="status == 'success'"
    label="Emprestado p/"
    :items="data ?? []"
    item-title="name"
    item-value="name"
  />

  <v-skeleton-loader v-else type="text" />
</template>
