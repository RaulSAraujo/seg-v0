<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputSituations",
});

const warrantyStore = useWarrantyStore();
const { situations } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchSituations();
});
</script>

<template>
  <UiAutoComplete label="Status fiscal" :items="situations ?? []" />
</template>
