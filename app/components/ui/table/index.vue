<script setup lang="ts">
// Componentes síncronos
import Footer from "./footer/Index.vue";
import Body from "./body_table/index.vue";

// Componentes assíncronos com delay reduzido e loading state
const DrawerFilter = defineAsyncComponent({
  loader: () => import("../drawer/filter/index.vue"),
  delay: 200,
  loadingComponent: {
    template: '<div class="drawer-loading"></div>',
  },
  errorComponent: {
    template: '<div class="drawer-error">Erro ao carregar filtro</div>',
  },
});
const DrawerGrid = defineAsyncComponent({
  loader: () => import("../drawer/grid/index.vue"),
  delay: 200,
  loadingComponent: {
    template: '<div class="drawer-loading"></div>',
  },
  errorComponent: {
    template: '<div class="drawer-error">Erro ao carregar grid</div>',
  },
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
const { gridStatus, gridData, gridError, refreshGrid } = useUserGrids();

// Slots
const slots = useSlots();
const parentSlots = computed(() => Object.keys(slots));

const getSlotName = (name: string) => name as string;

// Estados computados para transições
const isLoading = computed(() => gridStatus.value === 'pending' || gridStatus.value === 'idle');
const isError = computed(() => gridStatus.value === 'error');
const isSuccess = computed(() => gridStatus.value === 'success');

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
  <!-- Estado de loading com skeleton -->
  <Transition name="fade" mode="out-in">
    <div v-if="isLoading" key="loading" class="table-loading-container">
      <v-skeleton-loader
        type="table-heading, table-thead, table-tbody"
        class="table-skeleton"
      />
      <div class="loading-overlay">
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
        />
        <p class="mt-4 text-body-2 text-medium-emphasis">
          Carregando configuração da tabela...
        </p>
      </div>
    </div>

    <!-- Estado de erro -->
    <div v-else-if="isError" key="error" class="table-error-container">
      <v-alert
        type="error"
        variant="tonal"
        prominent
        class="ma-4"
      >
        <v-alert-title>Erro ao carregar tabela</v-alert-title>
        <div class="mt-2">
          {{ gridError?.message || 'Ocorreu um erro ao carregar os dados da tabela.' }}
        </div>
        <v-btn
          color="error"
          variant="outlined"
          class="mt-4"
          @click="refreshGrid()"
        >
          Tentar novamente
        </v-btn>
      </v-alert>
    </div>

    <!-- Conteúdo principal com transição -->
    <Body
      v-else-if="isSuccess"
      key="body"
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
  </Transition>

  <!-- Footer sempre visível -->
  <Transition name="slide-up">
    <Footer v-if="isSuccess" />
  </Transition>

  <!-- Componentes assíncronos (já têm transições próprias do Vuetify) -->
  <DrawerFilter v-if="isSuccess" />
  <DrawerGrid v-if="isSuccess" />

  <!-- Bottom Sheet (já tem transições próprias do Vuetify) -->
  <UiBottomSheet v-if="isSuccess">
    <template #selection-group-button>
      <slot name="selection-group-button" />
    </template>
    <template #selection-text>
      <slot name="selection-text" />
    </template>
  </UiBottomSheet>

  <!-- Floating Button (já tem transições próprias) -->
  <LazyUiTableFloatingButton v-if="isSuccess" hydrate-on-visible />
</template>

<style scoped>
:deep(.v-data-table__thead) {
  background-color: rgb(60 60 60 / 69%);
}

.v-theme--light :deep(.v-data-table__thead) {
  background-color: #eeeeee;
}

/* Container de loading */
.table-loading-container {
  position: relative;
  min-height: 400px;
}

.table-skeleton {
  opacity: 0.6;
}

.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* Container de erro */
.table-error-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.scale-enter-active,
.scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Loading dos drawers */
.drawer-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.drawer-error {
  padding: 1rem;
  color: rgb(var(--v-theme-error));
  text-align: center;
}
</style>
