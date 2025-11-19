<script lang="ts" setup>
interface Automation {
  description: string;
  name: string;
  route: string;
}

const { data, status } = await $api<Automation[]>(
  "order-automation/get-automations",
  {
    key: "order-automation",
    getCachedData(key, nuxtApp) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
  }
);
</script>

<template>
  <UiSelect
    v-if="status == 'success'"
    label="Automações"
    :items="data ?? []"
    item-title="name"
    item-value="name"
    :return-object="true"
  />
</template>
