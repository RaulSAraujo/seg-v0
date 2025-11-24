<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputState",
});

const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.state"
    v-maska="'AA'"
    label="Uf"
    hide-details="auto"
    :disabled="true"
  />
</template>
