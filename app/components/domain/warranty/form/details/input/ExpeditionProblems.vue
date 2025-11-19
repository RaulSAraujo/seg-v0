<script lang="ts" setup>
const warrantyStore = useWarrantyStore();
const { expeditionProblems } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchExpeditionProblems();
});
</script>

<template>
  <UiAutoComplete label="Problema expedição" :items="expeditionProblems ?? []" />
</template>
