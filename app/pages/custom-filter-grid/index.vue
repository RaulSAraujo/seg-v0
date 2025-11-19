<script setup lang="ts">
import type { Row } from "~/interfaces/CustomFilterGrid";

useHead({
  titleTemplate: `Filtros e grids - %s`,
});

definePageMeta({
  path: "/configuracoes/sistema/filtros-grids",
});

const modelStore = useModelStore();
const { models } = storeToRefs(modelStore);

const findScreenName = (model: string) => {
  return models.value.find((e) => e.entity_name == model)?.page_title || model;
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">FILTROS E GRIDS</span>

    <UiFilter>
      <template #button-create>
        <CustomFilterGridCreation />
      </template>

      <template #menu>
        <CustomFilterGridNewAttributes />

        <CustomFilterGridInitCustomFilter />

        <CustomFilterGridInitCustomGrid />
      </template>
    </UiFilter>

    <UiTable multi-sort>
      <template #item.action="{ item }">
        <CustomFilterGridEdit :item="item" />

        <UiDelete :id="item.id" :disabled="!item.external" />
      </template>

      <template #item.model="{ item }">
        <UiTooltip :text="findScreenName(item.model)" :vw="5" />
      </template>

      <template #item.layout_filters="{ item }: { item: Row }">
        <CustomFilterGridLayoutFilters
          :id="item.id"
          :attribute="item.attribute"
          :model="item.model"
          :layout-filters="item.layout_filters"
          :active="item.attribute == 'action' || !item.active"
          :type="item.type"
        />
      </template>

      <template #item.type="{ item }">
        <CustomFilterGridTemplateType :type="item.type" />
      </template>

      <template #item.align="{ item }">
        <v-icon v-if="item.align == 'start'" icon="mdi-format-align-left" />

        <v-icon v-if="item.align == 'center'" icon="mdi-format-align-center" />

        <v-icon v-if="item.align == 'end'" icon="mdi-format-align-right" />

        <v-icon v-if="item.align == ' d-none'" icon="mdi-grid-off" />
      </template>
    </UiTable>
  </div>
</template>
