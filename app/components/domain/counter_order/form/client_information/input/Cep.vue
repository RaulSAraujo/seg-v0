<script lang="ts" setup>
defineOptions({
  name: "CounterOrderCep",
});

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.zipcode"
    label="Cep"
    append-inner-icon="mdi-map-marker-outline"
    hide-details="auto"
    :disabled="true"
  />
</template>
