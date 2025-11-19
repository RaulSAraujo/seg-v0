<script lang="ts" setup>
import type { Users } from "~/interfaces/User";

interface Response {
  name: string;
}

const { data, status } = $api<Response[]>("service-order/user", {
  key: "users-stock",
  params: { active: true, full: false, group_id: [8, 24] },
  getCachedData: (key, nuxtApp) =>
    nuxtApp.payload.data[key] || nuxtApp.static.data[key],
  transform: (fetchData) => {
    return (fetchData as unknown as Users).rows.map((e) => ({
      name: e.name.toUpperCase(),
    }));
  },
});
</script>

<template>
  <UiCombobox
    v-if="status == 'success'"
    label="Destino"
    :items="data ?? []"
    item-title="name"
    item-value="name"
  />
</template>
