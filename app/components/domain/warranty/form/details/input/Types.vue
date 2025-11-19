<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputTypes",
});

const warrantyStore = useWarrantyStore();
const { types } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchTypes();
});
</script>

<template>
  <UiAutoComplete label="Destino peça" :items="types ?? []" />
</template>
