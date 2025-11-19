<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputStatuses",
});

const warrantyStore = useWarrantyStore();
const { statuses } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchStatuses();
});
</script>

<template>
  <UiAutoComplete label="Status solução" :items="statuses ?? []" />
</template>
