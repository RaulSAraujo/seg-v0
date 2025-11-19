<script lang="ts" setup>
defineOptions({
  name: "ClientInputNumber1",
});

const { value: number, errorMessage: error } = useField<string>("number1");
const { value: identifierNumber1 } = useField<string>("identifier_number1");
</script>

<template>
  <ClientUiTelephone
    v-model="number"
    v-maska="'(##) #####-####'"
    label="Telefone 1 (Whatsapp)"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="identifierNumber1 ?? ''"
    :error-messages="error"
    @update-text="identifierNumber1 = $event"
  />
</template>
