<script lang="ts" setup>
defineOptions({
  name: "SacStatusInput",
});

const { data, status } = $api<{ values: string[] }>("sac-sale/get-statuses", {
  key: "sac-statuses",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
});

const sacStore = useSacStore();
const { status: statusSac } = storeToRefs(sacStore);

const { data: user } = useAuth();
</script>

<template>
  <UiSelect
    v-if="status == 'success' && data"
    v-model="statusSac"
    label="Status"
    alt="statuses-input"
    :items="data.values"
    :disabled="user?.groupId != 1 && statusSac == 'VALIDAR'"
  />
</template>
