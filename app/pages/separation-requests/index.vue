<script setup lang="ts">
useHead({
  titleTemplate: `Pedidos de separação - %s`,
});

definePageMeta({
  path: "/pedidos-separacao",
});

const dialog = ref(false);
const status = ref("");

const activeDialog = (event: string) => {
  dialog.value = true;
  status.value = event;
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary">PEDIDOS DE SEPARAÇÃO</span>

    <SeparationRequestsFilter />

    <ClientOnly>
      <SeparationRequestsStatus @active="activeDialog" />

      <template #fallback>
        <div class="d-flex justify-end">
          <v-skeleton-loader width="800px" color="transparent" type="heading" />
        </div>
      </template>
    </ClientOnly>

    <SeparationRequestsTable />

    <SeparationRequestsStatusDialog v-model="dialog" :status="status" />
  </div>
</template>
