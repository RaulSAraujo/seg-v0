<script setup lang="ts">
useHead({
  titleTemplate: `Tabela de preço balcão - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/tabela-preco-balcao",
});
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">TABELA DE PREÇO BALÇÃO</span>

    <UiFilter>
      <template #button-create>
        <TablePriceCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <TablePriceEdit :item="item" />

        <UiDelete :id="item.id" />
      </template>

      <template #item.max_price="{ item }">
        <UiToLocaleString :value="item.max_price" />
      </template>

      <template #item.min_price="{ item }">
        <UiToLocaleString :value="item.min_price" />
      </template>
    </UiTable>
  </div>
</template>
