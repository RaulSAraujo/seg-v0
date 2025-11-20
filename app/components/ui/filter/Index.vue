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
const { filters, filterStatus, filterError } = useUserFilters();

// Estados computados para transições
const isLoading = computed(() => filterStatus.value === 'pending' || filterStatus.value === 'idle');
const isError = computed(() => filterStatus.value === 'error');
const isSuccess = computed(() => filterStatus.value === 'success');

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
  <!-- Estado de loading -->
  <Transition name="fade" mode="out-in">
    <div v-if="isLoading" key="loading" class="filter-loading-container">
      <v-skeleton-loader
        type="chip, chip, chip"
        class="filter-skeleton"
      />
      <v-progress-linear
        indeterminate
        color="primary"
        height="2"
        class="mt-2"
      />
    </div>

    <!-- Estado de erro -->
    <div v-else-if="isError" key="error" class="filter-error-container">
      <v-alert
        type="warning"
        variant="tonal"
        density="compact"
        class="ma-2"
      >
        <v-alert-title class="text-caption">Aviso</v-alert-title>
        <div class="text-caption mt-1">
          {{ filterError?.message || 'Não foi possível carregar os filtros personalizados.' }}
        </div>
      </v-alert>
    </div>

    <!-- Conteúdo principal com transição -->
    <Group
      v-else-if="isSuccess"
      key="group"
      :filters="filters"
    >
      <template #extra-filter>
        <slot name="extra-filter" />
      </template>
    </Group>
  </Transition>

  <!-- Botões sempre visíveis, mas com transição quando filtros carregam -->
  <Transition name="slide-down">
    <Buttons
      v-if="isSuccess || isError"
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
  </Transition>
</template>

<style scoped>
/* Container de loading */
.filter-loading-container {
  padding: 1rem;
  min-height: 80px;
  animation: containerFadeIn 0.3s ease;
}

.filter-skeleton {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@keyframes containerFadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Container de erro */
.filter-error-container {
  min-height: 60px;
}

/* Transições melhoradas */
.fade-enter-active {
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1),
    transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.slide-down-enter-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1),
    transform 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-15px) scale(0.96);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.98);
}

/* Animação para o skeleton loader */
.filter-skeleton {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}
</style>
