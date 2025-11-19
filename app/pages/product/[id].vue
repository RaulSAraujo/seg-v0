<script setup lang="ts">
import type { Product } from "~/interfaces/Product";

const { params } = useRoute();

useHead({
  titleTemplate: `Produto compra #${params.id} - %s`,
});

definePageMeta({
  path: "/produto-compra/:id",
});

const productStore = useProductStore();

const { data, status, refresh } = $useApi<Product>(`/product`, {
  params: {
    id: params.id as string,
  },
});

onMounted(() => {
  if (status.value === 'success' && data.value?.rows[0]) {
    productStore.setValues(data.value.rows[0]);
  }
});

onBeforeRouteLeave((to, from, next) => {
  // Verifica se está navegando para rotas relacionadas ao produto
  if (
    to.name?.toString().startsWith("product-id") ||
    to.path?.startsWith("/produto-compra")
  ) {
    next();
  } else {
    const tableStore = useTableStore();
    tableStore.clearTableProps();

    const gridStore = useGridStore();
    gridStore.clearGridProps();

    next();
  }
});
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row align-center mb-4">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para produtos"
        to="/produto-compra"
      />

      <v-spacer />

      <ProductIdBtnGroup />
    </div>

    <Transition name="fade" mode="out-in">
      <v-sheet
        v-if="status === 'success'"
        key="content"
        class="mx-2"
        rounded="xl"
        elevation="5"
      >
        <NuxtPage />
      </v-sheet>

      <v-sheet
        v-else-if="status === 'pending'"
        key="loading"
        class="mx-2 d-flex flex-column align-center justify-center"
        rounded="xl"
        elevation="5"
        min-height="400"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="6"
        />

        <p class="mt-4 text-body-1 text-medium-emphasis">
          Carregando dados do produto...
        </p>
      </v-sheet>

      <v-sheet
        v-else
        key="error"
        class="mx-2 d-flex flex-column align-center justify-center"
        rounded="xl"
        elevation="5"
        min-height="400"
      >
        <v-icon
          icon="mdi-alert-circle-outline"
          size="64"
          color="error"
          class="mb-4"
        />

        <p class="text-h6 text-error mb-2">Erro ao carregar produto</p>

        <p class="text-body-2 text-medium-emphasis mb-4">
          Não foi possível carregar os dados do produto. Tente novamente.
        </p>

        <v-btn
          color="primary"
          prepend-icon="mdi-refresh"
          @click="refresh"
        >
          Tentar novamente
        </v-btn>
      </v-sheet>
    </Transition>
  </div>
</template>
