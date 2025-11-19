<script setup lang="ts">
useHead({
  titleTemplate: `Cotações - %s`,
});

definePageMeta({
  path: "/cotacoes",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">COTAÇÕES</span>

    <div class="ma-4">
      <QuotationFirstStep />

      <QuotationSecondStep />

      <UiFilterMenuBtnGrid />
    </div>

    <QuotationTable />
  </div>
</template>
