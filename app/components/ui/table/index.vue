<script setup lang="ts">
// Componentes síncronos
import Footer from "./footer/Index.vue";
import Body from "./body_table/index.vue";

// Componentes assíncronos
const DrawerFilter = defineAsyncComponent({
  loader: () => import("../drawer/filter/index.vue"),
  delay: 5000,
});
const DrawerGrid = defineAsyncComponent({
  loader: () => import("../drawer/grid/index.vue"),
  delay: 5000,
});

// Props com valores padrão
const props = defineProps<{
  showSelect?: boolean;
  multiSort?: boolean;
  showExpand?: boolean;
  rowProps?: object;
  othersQuery?: Record<string, unknown>;
}>();

// Stores
const gridStore = useGridStore();

const tableStore = useTableStore();
const { othersQuery: ot, showExpand: st } = storeToRefs(tableStore);

// Composables
const { gridStatus, gridData } = useUserGrids();

// Slots
const slots = useSlots();
const parentSlots = computed(() => Object.keys(slots));

const getSlotName = (name: string) => name as string;

watchEffect(() => {
  if (props.othersQuery) {
    ot.value = props.othersQuery;
  }

  if (props.showExpand) {
    st.value = props.showExpand;
  }
});

onBeforeRouteLeave((to) => {
  if (Object.keys(to.params).length === 0) {
    tableStore.clearTableProps();
    gridStore.clearGridProps();
  }
});
</script>

<template>
  <Body
    v-if="gridStatus === 'success'"
    :grid-data="gridData"
    :row-props="rowProps"
    :show-select="showSelect ?? false"
    :multi-sort="multiSort ?? false"
    :show-expand="showExpand ?? false"
  >
    <template
      v-for="slotName in parentSlots"
      :key="slotName"
      #[getSlotName(slotName)]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </Body>

  <Footer />
  <DrawerFilter />
  <DrawerGrid />

  <UiBottomSheet>
    <template #selection-group-button>
      <slot name="selection-group-button" />
    </template>
    <template #selection-text>
      <slot name="selection-text" />
    </template>
  </UiBottomSheet>

  <LazyUiTableFloatingButton hydrate-on-visible />
</template>

<style scoped>
:deep(.v-data-table__thead) {
  background-color: rgb(60 60 60 / 69%);
}

.v-theme--light :deep(.v-data-table__thead) {
  background-color: #eeeeee;
}
</style>
