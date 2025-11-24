<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: complement, errorMessage: error } = useField<string | undefined>(
  "complement"
);

watch(
  () => addressData.value.complement,
  () => {
    complement.value = addressData.value.complement;
  }
);
</script>

<template>
  <UiTextField
    v-model="addressData.complement"
    label="Complemento"
    :hide-details="true"
    :error-messages="error"
  />
</template>
