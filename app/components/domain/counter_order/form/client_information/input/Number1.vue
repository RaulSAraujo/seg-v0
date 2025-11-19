<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputNumber1",
});

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <ClientUiTelephone
    v-model="customerData.number1"
    v-maska="'(##) #####-####'"
    label="Telefone 1 (Whatsapp)"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :disabled="true"
    :hint="customerData.identifier_number1 ?? ''"
    @update-text="customerData.identifier_number1 = $event"
  />
</template>
