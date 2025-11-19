<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: state, errorMessage: error } = useField<string>("state");

watch(
  () => addressData.value.state,
  () => {
    state.value = addressData.value.state;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.state"
    v-maska="'AA'"
    label="Uf"
    hide-details="auto"
    :error-messages="error"
  />
</template>
