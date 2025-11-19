<script lang="ts" setup>
defineOptions({
  name: "ClientInputViaCep",
});

const { value: zipcode, errorMessage: error } = useField<string>(
  "ClientsAddresses.zipcode"
);
const { value: city } = useField<string>("ClientsAddresses.city");
const { value: state } = useField<string>("ClientsAddresses.state");
const { value: neighbourhood } = useField<string>(
  "ClientsAddresses.neighbourhood"
);
const { value: street } = useField<string>("ClientsAddresses.street");
const { value: complement } = useField<string>("ClientsAddresses.complement");
</script>

<template>
  <ClientUiViaCep
    v-model="zipcode"
    :error-messages="error"
    :value="zipcode"
    @update="
      (data) => {
        street = data.logradouro.toUpperCase();
        neighbourhood = data.bairro.toUpperCase();
        city = data.localidade.toUpperCase();
        state = data.uf.toUpperCase();
        complement = data.complemento.toUpperCase();
      }
    "
  />
</template>
