<script lang="ts" setup>
const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.neighbourhood"
    label="Bairro"
    hide-details="auto"
    :disabled="true"
  />
</template>
