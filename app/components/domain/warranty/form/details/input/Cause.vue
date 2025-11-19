<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputCause",
});

const warrantyStore = useWarrantyStore();
const { causes } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchCauses();
});
</script>

<template>
  <UiAutoComplete label="Causa" :items="causes || []" />
</template>
