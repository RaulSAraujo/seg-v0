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
  <div class="d-flex justify-end mr-5 mb-5">
    <slot name="button-create" />

    <v-btn
      class="mr-2"
      rounded="lg"
      color="primary"
      :disabled="loading"
      @click="tableStore.searchData"
    >
      BUSCAR
    </v-btn>

    <v-btn
      class="mr-2"
      variant="outlined"
      color="primary"
      rounded="lg"
      @click="clear"
    >
      Limpar Filtros
    </v-btn>

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
</template>
