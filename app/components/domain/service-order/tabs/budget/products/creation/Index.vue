<script lang="ts" setup>
// ===== IMPORTS E TIPOS =====
import { useOSProductsApi } from "~/services/service_order.service/useServiceOrderProductsApi";

import type { Product, Row } from "~/interfaces/Product";
import type { ServiceOrderProductForm } from "~/interfaces/ServiceOrder";

// ===== COMPONENTES ASSÍNCRONOS =====
const Find = defineAsyncComponent(() => import("./Find.vue"));
const Table = defineAsyncComponent(() => import("./Table.vue"));

defineOptions({
  name: "ServiceOrderBudgetProductsCreation",
});

// ===== COMPOSABLES =====
const { params } = useRoute();
const loading = useLoadingIndicator();
const { $customFetch } = useNuxtApp();

// ===== STORES =====
const apparatusStore = useServiceOrderApparatusStore();
const { apparatusData } = storeToRefs(apparatusStore);

// ===== APIS =====
const { create } = useOSProductsApi();

// ===== ESTADO REATIVO =====
const products = ref<Row[]>([]);
const loadingTable = ref(false);
const dialogVisible = ref(false);

// ===== COMPUTED PROPERTIES =====
const hasApparatusModel = computed(() => {
  return Boolean(apparatusData.value?.model);
});

const defaultQuery = computed(() => ({
  model: apparatusData.value?.model || "",
}));

// ===== FUNÇÕES UTILITÁRIAS =====
const isValidSearchEvent = (event: ServiceOrderProductForm | null): boolean => {
  if (!event) return false;

  return Object.values(event).some(
    (value) => typeof value === "string" && value.length > 0
  );
};

const buildSearchQuery = (event: ServiceOrderProductForm | null) => {
  if (event && isValidSearchEvent(event)) {
    return event;
  }

  return defaultQuery.value;
};

const handleApiError = (error: unknown): void => {
  const err = error as {
    statusText?: string;
    data?: { error?: string };
  };

  const errorMessage = err.data?.error || err.statusText || "Erro desconhecido";
  $toast().error(errorMessage);
};

// ===== MÉTODOS PRINCIPAIS =====
const search = async (event: ServiceOrderProductForm | null): Promise<void> => {
  // Validação inicial
  if (!event && !hasApparatusModel.value) {
    $toast().warning("Modelo do aparelho não encontrado");
    return;
  }

  try {
    loadingTable.value = true;

    const query = buildSearchQuery(event);

    // Validação da query
    if (!query.model && !Object.values(query).some((v) => v)) {
      $toast().info("Informe pelo menos um critério de busca");
      return;
    }

    const { rows } = await $customFetch<Product>("product", {
      query,
    });

    products.value = rows || [];

    if (rows?.length === 0) {
      $toast().info("Nenhum produto encontrado");
    }
  } catch (error) {
    console.error("Erro na busca de produtos:", error);
    handleApiError(error);
    products.value = [];
  } finally {
    loadingTable.value = false;
  }
};

const handleAddProduct = async (product: Row): Promise<void> => {
  try {
    loading.start();

    await create(params.id as string, product);

    dialogVisible.value = false;

    $toast().success("Produto adicionado com sucesso!");
  } catch (error) {
    handleApiError(error);
  } finally {
    loading.finish();
  }
};

const openDialog = (): void => {
  dialogVisible.value = true;

  search(null);
};
</script>

<template>
  <v-dialog
    v-model="dialogVisible"
    :width="1200"
    :max-width="'90vw'"
    transition="dialog-top-transition"
    scrollable
  >
    <!-- Botão de ativação -->
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="primary"
        prepend-icon="mdi-plus"
        class="mr-2"
        @click="openDialog"
      >
        Adicionar Produto
      </v-btn>
    </template>

    <!-- Conteúdo do dialog -->
    <template #default>
      <v-card rounded="xl" class="product-dialog">
        <!-- Header -->
        <v-card-title class="d-flex align-center">
          <v-icon class="me-3" color="primary">mdi-package-variant-plus</v-icon>
          <span>Adicionar Novo Produto</span>
        </v-card-title>

        <!-- Conteúdo principal -->
        <v-card-text class="pa-6">
          <!-- Componente de busca -->
          <div class="mb-6">
            <Find @search="search($event)" />
          </div>

          <!-- Tabela de produtos -->
          <Table
            :products="products"
            :loading="loadingTable"
            @add="handleAddProduct($event)"
          />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.product-dialog {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.product-dialog :deep(.v-card-text) {
  flex: 1;
  overflow-y: auto;
}

/* Responsividade */
@media (max-width: 768px) {
  .product-dialog {
    margin: 8px;
    max-height: calc(100vh - 16px);
  }
}
</style>
