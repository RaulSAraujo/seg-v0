<script setup lang="ts">
useHead({
  titleTemplate: `Validação de envio - %s`,
});

definePageMeta({
  path: "/validacao-envio",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">VALIDAÇÃO DE ENVIO</span>

    <ShippingValidationFilter />

    <ShippingValidationTable />
  </div>
</template>
