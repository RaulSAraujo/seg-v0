<script setup lang="ts">
useHead({
  titleTemplate: `Tabela diversas - regiões - %s`,
});

definePageMeta({
  path: "/tabelas-diversas/regioes",
});
</script>

<template>
  <div class="mt-5">
    <UiFilter>
      <template #button-create>
        <RegionCreation />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <UiDelete :id="item.id" />
      </template>
    </UiTable>
  </div>
</template>
