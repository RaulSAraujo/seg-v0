<script lang="ts" setup>
defineOptions({
  name: "ClientInputNumber3",
});

const { value: number, errorMessage: error } = useField<string | undefined>(
  "number3"
);
const { value: identifierNumber3 } = useField<string>("identifier_number3");
</script>

<template>
  <ClientUiTelephone
    v-model="number"
    v-maska="'(##) #####-####'"
    label="Telefone 3"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="identifierNumber3 ?? ''"
    :error-messages="error"
    @update-text="identifierNumber3 = $event"
  />
</template>
