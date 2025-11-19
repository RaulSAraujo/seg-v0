<script setup lang="ts">
useHead({
  titleTemplate: `Tabela diversas - cidades - %s`,
});

definePageMeta({
  path: "/tabelas-diversas/cidades",
});
</script>

<template>
  <div class="mt-5">
    <UiFilter>
      <template #button-create>
        <CityCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <CityEdit :item="item" />

        <UiDelete :id="item.id" />
      </template>

      <template #item.region_id="{ item }">
        <span>{{ item.Region?.region ?? item.region_id }}</span>
      </template>
    </UiTable>
  </div>
</template>
