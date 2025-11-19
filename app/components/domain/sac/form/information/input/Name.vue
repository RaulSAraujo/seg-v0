<script lang="ts" setup>
defineOptions({
  name: "SacNameInput",
});

const sacCustomerStore = useSacCustomerStore();
const { customerData } = storeToRefs(sacCustomerStore);
</script>

<template>
  <UiTextField
    v-model="customerData.name"
    label="Nome do cliente"
    hide-details="auto"
    :disabled="true"
  />
</template>
