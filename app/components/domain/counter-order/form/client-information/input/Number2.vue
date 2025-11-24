<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputNumber2",
});

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <ClientUiTelephone
    v-model="customerData.number2"
    v-maska="'(##) #####-####'"
    label="Telefone 2"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :disabled="true"
    :hint="customerData.identifier_number2 ?? ''"
    @update-text="customerData.identifier_number2 = $event"
  />
</template>
