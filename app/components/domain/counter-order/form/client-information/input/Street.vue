<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputStreet",
});

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.street"
    label="Rua"
    append-inner-icon="mdi-road"
    hide-details="auto"
    :disabled="true"
  />
</template>
