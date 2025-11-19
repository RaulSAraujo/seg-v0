<script lang="ts" setup>
defineOptions({
  name: "SacNeighborhoodInput",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.neighborhood"
    label="Bairro"
    hide-details="auto"
    :disabled="true"
  />
</template>
