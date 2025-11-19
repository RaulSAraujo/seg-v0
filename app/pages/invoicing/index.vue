<script setup lang="ts">
useHead({
  titleTemplate: `Faturamento - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/faturamento",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">FATURAMENTO</span>

    <UiFilter>
      <template #button-create>
        <InvoicingCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <InvoicingEdit :item="item" />

        <UiDelete :id="item.id" />
      </template>

      <template #item.erp_company_id="{ item }">
        <span>{{ item.Company.fantasy_name }}</span>
      </template>
    </UiTable>
  </div>
</template>
