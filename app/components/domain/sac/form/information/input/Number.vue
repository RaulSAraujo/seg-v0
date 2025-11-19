<script lang="ts" setup>
defineOptions({
  name: "SacNumberInput",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
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
