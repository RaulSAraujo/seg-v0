<script lang="ts" setup>
defineOptions({
  name: "CounterOrderCity",
});

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.city"
    label="Cidade"
    append-inner-icon="mdi-city"
    hide-details="auto"
    :disabled="true"
  />
</template>
