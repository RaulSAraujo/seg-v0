<script setup lang="ts">
import type { Client } from "~/interfaces/Client";

const { params } = useRoute();

useHead({
  titleTemplate: `Cliente #${params.id} - %s`,
});

definePageMeta({
  path: "/cliente/:id",
});

const router = useRouter();

const { data, status } = $useApi<Client>(`/clients`, {
  params: {
    id: params.id as string,
  },
});

onBeforeRouteLeave((to, from, next) => {
  if (to.name == "client" || to.name == "client-id") {
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
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        :text="'Voltar'"
        @click="router.back()"
      />
    </div>

    <v-sheet class="mx-2 pb-4" rounded="xl">
      <ClientForm
        v-if="status === 'success' && data && data.rows[0]"
        :client-id="params.id as string"
        title="EDITAR CLIENTE"
        :initial-values="data.rows[0]"
      />
    </v-sheet>
  </div>
</template>
