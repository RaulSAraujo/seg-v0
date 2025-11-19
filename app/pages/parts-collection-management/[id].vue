<script setup lang="ts">
import type {
  PartsCollectionManagement,
  Row,
} from "~/interfaces/PartsCollectionManagement";

onBeforeRouteLeave((to, from, next) => {
  if (
    to.name == "parts-collection-management" ||
    to.name == "parts-collection-management-id"
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

const { params } = useRoute();

useHead({
  titleTemplate: `Gestão de coletas #${params.id} - %s`,
});

definePageMeta({
  path: "/gestao-coletas/:id",
});

const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);

const { data, status } = $api<Row>(`parts-collection-management`, {
  key: `parts-collection-management-${params.id}`,
  query: {
    id: params.id,
  },
  transform: (fetchData) => {
    const row = (fetchData as unknown as PartsCollectionManagement).rows[0];

    return row || ({} as Row);
  },
});

const { brDate } = useDateConversion();

watch(
  () => status.value,
  () => {
    if (status.value == "success" && data.value) {
      Object.entries(data.value).forEach(([key, value]) => {
        if (key in form.value) {
          if (
            key == "collection_date_os" ||
            key == "end_date_os" ||
            key == "limit_date_storage" ||
            key == "warehouse_delivery_date" ||
            key == "requested_collection_date" ||
            key == "completion_deadline" ||
            key == "final_date"
          ) {
            (form.value as unknown as Record<string, unknown>)[key] =
              brDate(value);

            return;
          }

          (form.value as unknown as Record<string, unknown>)[key] = value;
        }
      });
    }
  }
);
</script>

<template>
  <div class="my-5 mx-2">
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="VOLTAR PARA GERENCIAMENTO DE COLETA DE PEÇAS"
        :to="{
          name: 'parts-collection-management-creation',
        }"
      />
    </div>

    <div v-if="status == 'success'">
      <PartsCollectionManagementForm
        :title="`ATUALIZAR A GESTÃO #${params.id}`"
        method-rest="PUT"
      />

      <PartsCollectionManagementFloatingSaveButton method-rest="PUT" />
    </div>
  </div>
</template>
