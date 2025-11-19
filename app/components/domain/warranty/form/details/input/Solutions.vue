<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputSolutions",
});

const warrantyStore = useWarrantyStore();
const { solutions } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchSolutions();
});
</script>

<template>
  <UiAutoComplete label="Solução" :items="solutions ?? []" />
</template>
