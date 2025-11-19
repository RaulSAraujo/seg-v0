<script lang="ts" setup>
import type { Puppeteer } from "~/interfaces/Puppeteer";

const { $config } = useNuxtApp();

const baseURL = $config.public.automation_base_url as string;
const { data } = await $api<Puppeteer[]>(`${baseURL}/automation-information`, {
  key: "automation-information",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});
</script>

<template>
  <UiSelect
    label="Selecione o grupo"
    :items="data ?? []"
    item-title="group_name"
    item-value="group_name"
    :multiple="false"
    :return-object="true"
    :clearable="true"
    prepend-icon="mdi-list-box"
  />
</template>
