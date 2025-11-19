<script lang="ts" setup>
defineOptions({
  name: "WarrantyInputAccount",
});

const warrantyStore = useWarrantyStore();
const { accounts } = storeToRefs(warrantyStore);

onMounted(() => {
  warrantyStore.fetchAccounts();
});
</script>

<template>
  <UiAutoComplete label="Conta" :items="accounts ?? []" />
</template>
