<script lang="ts" setup>
const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <UiTextArea
    v-model="customerData.observation"
    label="Observações do cliente"
    :hide-details="true"
    disabled
  />
</template>
