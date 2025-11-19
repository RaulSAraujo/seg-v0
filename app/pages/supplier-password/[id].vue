<script lang="ts" setup>
const { params } = useRoute();

useHead({
  titleTemplate: `Senhas de fornecedor #${params.id} - %s`,
});

definePageMeta({
  path: "/senhas-fornecedores/:id",
});

onBeforeRouteLeave((to, from, next) => {
  if (
    to.name == "supplier-password" ||
    to.name == "supplier-password-id"
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
    <div class="d-flex flex-row mb-2">
      <v-btn
        variant="plain"
        prepend-icon="mdi-arrow-left"
        text="Voltar para senhas de fornecedor"
        :to="{
          name: 'supplier-password',
        }"
      />

      <v-spacer />
    </div>

    <v-sheet class="mx-2" rounded="xl" elevation="5">
      <SupplierPasswordIdTimeline :id-supplier="params.id as string" />
    </v-sheet>
  </div>
</template>
