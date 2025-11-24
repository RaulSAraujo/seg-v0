<script lang="ts" setup>
const payments = ref(["BOLETO", "PIX", "CCPJ", "CCPF"]);
</script>

<template>
  <UiSelect label="Forma de pagamento" :items="payments" />
</template>
