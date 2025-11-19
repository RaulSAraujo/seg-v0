<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: mapsLocation, errorMessage: error } = useField<string | undefined>(
  "maps_location"
);

watch(
  () => addressData.value.maps_location,
  () => {
    mapsLocation.value = addressData.value.maps_location;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.maps_location"
    label="Localização maps"
    append-inner-icon="mdi-map"
    hide-details="auto"
    :error-messages="error"
  />
</template>
