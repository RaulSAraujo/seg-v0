<script lang="ts" setup>
defineOptions({
  name: "SacNumber1Input",
});

const sacCustomerStore = useSacCustomerStore();
const { customerData } = storeToRefs(sacCustomerStore);
</script>

<template>
  <UiTextField
    v-maska="'(##) #####-####'"
    :value="customerData.phone || customerData.cellphone"
    label="Telefone 1"
    append-inner-icon="mdi-numeric"
    hide-details="auto"
    :disabled="true"
  />
</template>
