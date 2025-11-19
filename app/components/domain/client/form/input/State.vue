<script lang="ts" setup>
defineOptions({
  name: "ClientInputState",
})

const { value: state, errorMessage: error } = useField<string>("ClientsAddresses.state");
</script>

<template>
  <UiTextField
    v-model="state"
    v-maska="'AA'"
    label="Uf"
    hide-details="auto"
    :error-messages="error"
  />
</template>
