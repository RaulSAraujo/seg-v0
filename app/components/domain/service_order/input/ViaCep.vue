<script lang="ts" setup>
const addressStore = useServiceOrderAddressStore();
const { addressData } = storeToRefs(addressStore);

const { value: zipcode, errorMessage: error } = useField<string>("zipcode");

watch(
  () => addressData.value.zipcode,
  () => {
    zipcode.value = addressData.value.zipcode;
  }
);
</script>

<template>
  <ClientUiViaCep
    v-model="addressData.zipcode"
    :error-messages="error"
    :value="zipcode"
    @update="
      (data) => {
        addressData.street = data.logradouro.toUpperCase();
        addressData.neighbourhood = data.bairro.toUpperCase();
        addressData.city = data.localidade.toUpperCase();
        addressData.state = data.uf.toUpperCase();
        addressData.complement = data.complemento.toUpperCase();
      }
    "
  />
</template>
