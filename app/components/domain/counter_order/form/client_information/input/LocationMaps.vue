<script lang="ts" setup>
const counterOrderAddressStore = useCounterOrderAddressStore();
const { addressData } = storeToRefs(counterOrderAddressStore);
</script>

<template>
  <UiTextField
    v-model="addressData.maps_location"
    label="Localização maps"
    append-inner-icon="mdi-map"
    hide-details="auto"
    disabled
  />
</template>
