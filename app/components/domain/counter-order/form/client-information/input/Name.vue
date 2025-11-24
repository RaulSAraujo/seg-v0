<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputName",
});

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <UiTextField
    v-model="customerData.name"
    label="Nome do cliente"
    hide-details="auto"
    :disabled="true"
  />
</template>
