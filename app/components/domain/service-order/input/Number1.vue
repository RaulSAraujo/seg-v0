<script lang="ts" setup>
defineProps<{
  readonly?: boolean;
}>();

const clientStore = useServiceOrderClientStore();
const { clientData } = storeToRefs(clientStore);

const { value: number, errorMessage: error } = useField<string>("number1");

watch(
  () => clientData.value.number1,
  () => {
    number.value = clientData.value.number1;
  }
);
</script>

<template>
  <ClientUiTelephone
    v-model="clientData.number1"
    v-maska="'(##) #####-####'"
    label="Telefone 1 (WhatsApp)"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :readonly="readonly"
    :hint="clientData.identifier_number1 ?? ''"
    :error-messages="error"
    @update-text="clientData.identifier_number1 = $event"
  />
</template>
