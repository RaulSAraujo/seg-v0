<script lang="ts" setup>
defineOptions({
  name: "CounterOrderInputNumber3",
});

const counterOrderClientStore = useCounterOrderClientStore();
const { customerData } = storeToRefs(counterOrderClientStore);
</script>

<template>
  <ClientUiTelephone
    v-model="customerData.number3"
    v-maska="'(##) #####-####'"
    label="Telefone 3"
    placeholder="(__) _____-____"
    prepend-inner-icon="mdi-phone"
    hide-details="auto"
    persistent-hint
    :disabled="true"
    :hint="customerData.identifier_number3 ?? ''"
    @update-text="customerData.identifier_number3 = $event"
  />
</template>
