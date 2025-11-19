<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputNumber",
});

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.number"
    label="Número"
    append-inner-icon="mdi-numeric"
    hide-details="auto"
    :disabled="true"
  />
</template>
