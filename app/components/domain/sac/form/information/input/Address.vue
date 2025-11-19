<script lang="ts" setup>
defineOptions({
  name: "SacFormInputAddress",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.address"
    label="Rua"
    append-inner-icon="mdi-road"
    hide-details="auto"
    :disabled="true"
  />
</template>
