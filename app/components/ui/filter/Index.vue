<script setup lang="ts">
import Group from "./Group.vue";
import Buttons from "./Buttons.vue";

defineProps<{
  hideMenu?: boolean;
  hideExcel?: boolean;
  hideGrid?: boolean;
  hideFilter?: boolean;
}>();

defineEmits(["clear"]);

// Usa o composable para obter os dados dos filtros
const { filters, filterStatus } = useUserFilters();

onBeforeRouteLeave((to, from, next) => {
  if (Object.keys(to.params).length > 0) {
    next();
  } else {
    const filterStore = useFilterStore();
    filterStore.clearValues();
    filterStore.clearFilterProps();

    next();
  }
});
</script>

<template>
  <Group v-if="filterStatus === 'success'" :filters="filters">
    <template #extra-filter>
      <slot name="extra-filter" />
    </template>
  </Group>

  <Buttons
    :hide-menu="hideMenu"
    :hide-excel="hideExcel"
    :hide-filter="hideFilter"
    :hide-grid="hideGrid"
    @clear="$emit('clear')"
  >
    <template #menu>
      <slot name="menu" />
    </template>

    <template #button-create>
      <slot name="button-create" />
    </template>
  </Buttons>
</template>
