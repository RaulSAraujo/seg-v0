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

// Aplicar animação escalonada às linhas da tabela
const tableRef = ref<HTMLElement | null>(null);

watch([items, loading], () => {
  if (!loading.value && items.value.length > 0) {
    nextTick(() => {
      applyRowAnimations();
    });
  }
});

onMounted(() => {
  nextTick(() => {
    applyRowAnimations();
  });
});

function applyRowAnimations() {
  const ref = tableRef.value;
  if (!ref) return;
  
  nextTick(() => {
    // Buscar dentro do ClientOnly
    const tbody = ref.querySelector('.v-data-table__tbody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('.v-data-table__tr');
    if (rows.length === 0) return;

    rows.forEach((row, index) => {
      const delay = Math.min(index * 0.02, 1); // Delay máximo de 1s
      (row as HTMLElement).style.setProperty('--animation-delay', `${delay}s`);
    });
  });
}
</script>

<template>
  <div ref="tableRef" class="table-body-wrapper">
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
  </div>
</template>

<style scoped>
:deep(.v-data-table__thead) {
  background-color: rgb(60 60 60 / 69%);
}

.v-theme--light :deep(.v-data-table__thead) {
  background-color: #eeeeee;
}

/* Transições suaves para as linhas da tabela */
:deep(.v-data-table__tr) {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

:deep(.v-data-table__tr:hover) {
  transform: translateX(2px);
}

/* Animação de entrada para as linhas */
:deep(.v-data-table__tbody .v-data-table__tr) {
  animation: fadeInRow 0.3s ease forwards;
  animation-delay: var(--animation-delay, 0s);
  opacity: 0;
}

@keyframes fadeInRow {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transição suave para o loader */
:deep(.v-data-table__loader) {
  transition: opacity 0.3s ease;
}
</style>
