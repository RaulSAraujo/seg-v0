<script lang="ts" setup>
defineOptions({
  name: "CashControlPayments",
})

const payments = ref(["CARTÃO", "DINHEIRO", "PIX", "CHEQUE", "CARTEIRA"]);
</script>

<template>
  <UiSelect
    label="Forma de pagamento"
    :items="payments"
    :multiple="false"
    :return-object="false"
    :clearable="true"
  />
</template>
