<script lang="ts" setup>
const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: number, errorMessage: error } = useField<string | undefined>("number2");

watch(
  () => clientData.value.number3,
  () => {
    number.value = clientData.value.number3 ?? "";
  }
);
</script>

<template>
  <ClientUiTelephone
    v-model="clientData.number3"
    v-maska="'(##) #####-####'"
    label="Telefone 3"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :hint="clientData.identifier_number3 ?? ''"
    :error-messages="error"
    @update-text="clientData.identifier_number3 = $event"
  />
</template>
