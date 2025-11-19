<script lang="ts" setup>
import Date from "./templates/Date.vue";
import String from "./templates/String.vue";
import Boolean from "./templates/Boolean.vue";

import type { Header } from "~/interfaces/Header";
import type { Grid } from "~/interfaces/Grid";

// Props com valores padrão
const props = defineProps<{
  gridData?: Grid;
  rowProps?: object;
  showSelect: boolean | undefined;
  multiSort: boolean | undefined;
  showExpand: boolean | undefined;
}>();

const { $device } = useNuxtApp();

// Stores
const gridStore = useGridStore();
const { availableGrid, availableFormat } = storeToRefs(gridStore);

if (props.gridData && props.gridData?.totalRecords > 0) {
  gridStore.set(props.gridData);
} else {
  const model = useModelStore().findModelName();

  gridStore.create(model);
}

const tableStore = useTableStore();
const {
  page,
  items,
  itemsPerPage,
  totalItems,
  sortBy,
  loading,
  expanded,
  selected,
} = storeToRefs(tableStore);

// Headers computados
const headers = computed<Header[]>(() => {
  if (!availableGrid.value?.length) return [];

  return availableGrid.value.map(({ title, key, maxWidth, align }) => ({
    title,
    key,
    width: maxWidth ? Number(maxWidth) : undefined,
    align: align as Header["align"],
  }));
});

// Slots
const slots = useSlots();
const parentSlots = computed(() => Object.keys(slots));

// Estado reativo
const expandedAll = ref(false);

// Funções
const toggleExpandAll = () => {
  expandedAll.value = !expandedAll.value;

  if (expandedAll.value && items.value.length > 0) {
    expanded.value = items.value as never[];
  } else {
    expanded.value = [];
  }
};

const isStringOrArray = (type: string, value: unknown): value is string =>
  (type === "STRING" || type === "ARRAY") && typeof value === "string";

// Helpers
const getSlotName = (name: string) => name as string;
const getItemSlotName = (key: string) => `item.${key}` as string;
</script>

<template>
  <ClientOnly>
    <v-data-table-server
      v-model="selected"
      v-model:expanded="expanded"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="items"
      item-value="id"
      select-strategy="all"
      :page="page"
      :items-per-page="itemsPerPage"
      :items-length="totalItems"
      :loading="loading"
      loading-text="Loading... Please wait"
      :show-expand="showExpand"
      :show-select="$device.isMobile ? false : showSelect"
      :multi-sort="multiSort"
      mobile-breakpoint="sm"
      :row-props="rowProps"
      density="compact"
      return-object
      hide-default-footer
      @update:options="tableStore.searchData"
    >
      <template
        v-for="header in availableFormat"
        :key="header.key"
        #[getItemSlotName(header.key)]="{ item }"
      >
        <Date
          v-if="header.type === 'DATE'"
          :value="item[header.key as keyof typeof item]"
        />

        <Boolean
          v-else-if="header.type === 'BOOLEAN'"
          :value="item[header.key as keyof typeof item]"
        />

        <String
          v-else-if="isStringOrArray(header.type, item[header.key as keyof typeof item])"
          :value="item[header.key as keyof typeof item]"
          :max-width="header.maxWidth"
        />

        <span v-else>{{ item[header.key as keyof typeof item] }}</span>
      </template>

      <template
        v-for="slotName in parentSlots"
        :key="slotName"
        #[getSlotName(slotName)]="slotProps"
      >
        <slot :name="slotName" v-bind="slotProps" />
      </template>

      <template
        #header.data-table-select="{ selectAll, allSelected, someSelected }"
      >
        <v-checkbox
          id="tableSelect"
          :value="!allSelected"
          :indeterminate="someSelected && !allSelected"
          hide-details
          @click="selectAll(!allSelected)"
        />
      </template>

      <template #header.data-table-expand>
        <v-btn
          :icon="expandedAll ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          variant="plain"
          @click="toggleExpandAll"
        />
      </template>

      <template #loader="{ isActive }">
        <v-progress-linear
          v-if="isActive"
          color="primary"
          indeterminate
          height="2"
        />
      </template>
    </v-data-table-server>
  </ClientOnly>
</template>

<style scoped>
:deep(.v-data-table__thead) {
  background-color: rgb(60 60 60 / 69%);
}

.v-theme--light :deep(.v-data-table__thead) {
  background-color: #eeeeee;
}
</style>
