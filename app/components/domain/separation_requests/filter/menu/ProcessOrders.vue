<script lang="ts" setup>
import { processOrdersSalesOrderSeparation } from "~/services/separation-requests.service";

const tableStore = useTableStore();

const synchronization = async () => {
  try {
    await processOrdersSalesOrderSeparation();

    tableStore.searchData();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="FORÇAR SINCRONIZAÇÃO"
    content-class="bg-deep-orange"
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-sync"
        class="text-deep-orange"
        @click="synchronization"
      />
    </template>
  </v-tooltip>
</template>
