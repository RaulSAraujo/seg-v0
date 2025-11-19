<script lang="ts" setup>
defineOptions({
  name: "SacCityInput",
});

const sacAddressStore = useSacAddressStore();
const { addressData } = storeToRefs(sacAddressStore);
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
