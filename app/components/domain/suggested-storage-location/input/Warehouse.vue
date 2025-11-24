<script lang="ts" setup>
interface Row {
  id: number;
  name: string;
}

const { data, status } = $api<{ rows: Row[] }>(
  "stocking-module/availables-stocking-module",
  {
    key: "availables-stocking-module",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Almoxarifado"
    :items="data?.rows ?? []"
    item-title="name"
    item-value="name"
    :multiple="false"
    :clearable="true"
    :return-object="true"
  />

  <v-skeleton-loader v-else type="text" />
</template>
