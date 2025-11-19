<script lang="ts" setup>
defineOptions({
  name: "ClientInputNumber2",
});

const { value: number, errorMessage: error } = useField<string | undefined>(
  "number2"
);
const { value: identifierNumber2 } = useField<string>("identifier_number2");
</script>

<template>
  <ClientUiTelephone
    v-model="number"
    v-maska="'(##) #####-####'"
    label="Telefone 2"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="identifierNumber2 ?? ''"
    :error-messages="error"
    @update-text="identifierNumber2 = $event"
  />
</template>
