<script lang="ts" setup>
defineOptions({
  name: "SacStateInput",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
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
