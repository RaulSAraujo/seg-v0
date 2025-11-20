<script setup lang="ts">
import Menu from "./menu/index.vue";

defineProps<{
  hideMenu?: boolean;
  hideExcel?: boolean;
  hideGrid?: boolean;
  hideFilter?: boolean;
}>();

const emit = defineEmits(["clear"]);

const filterStore = useFilterStore();

const tableStore = useTableStore();
const { page, sortBy, loading } = storeToRefs(tableStore);

const clear = () => {
  filterStore.clearValues();

  sortBy.value = undefined;

  emit("clear");

  if (page.value > 1) {
    page.value = 1;
  } else {
    setTimeout(() => {
      tableStore.searchData();
    }, 200);
  }
};
</script>

<template>
  <div class="filter-buttons-wrapper d-flex justify-end mr-5 mb-5">
    <div class="filter-button-item">
      <slot name="button-create" />
    </div>

    <div class="filter-button-item">
      <v-btn
        class="mr-2"
        rounded="lg"
        color="primary"
        :disabled="loading"
        @click="tableStore.searchData"
      >
        BUSCAR
      </v-btn>
    </div>

    <div class="filter-button-item">
      <v-btn
        class="mr-2"
        variant="outlined"
        color="primary"
        rounded="lg"
        @click="clear"
      >
        Limpar Filtros
      </v-btn>
    </div>

    <div class="filter-button-item">
      <Menu
        :hide-menu="hideMenu"
        :hide-excel="hideExcel"
        :hide-filter="hideFilter"
        :hide-grid="hideGrid"
      >
        <template #menu>
          <slot name="menu" />
        </template>
      </Menu>
    </div>
  </div>
</template>

<style scoped>
.filter-buttons-wrapper {
  animation: buttonsFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.filter-button-item {
  animation: buttonSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
  transform: translateX(10px);
}

.filter-button-item:nth-child(1) {
  animation-delay: 0.1s;
}

.filter-button-item:nth-child(2) {
  animation-delay: 0.15s;
}

.filter-button-item:nth-child(3) {
  animation-delay: 0.2s;
}

.filter-button-item:nth-child(4) {
  animation-delay: 0.25s;
}

@keyframes buttonsFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes buttonSlideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Transição suave nos botões */
:deep(.v-btn) {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-btn:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:deep(.v-btn:active:not(:disabled)) {
  transform: translateY(0);
}
</style>
