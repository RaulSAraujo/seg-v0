<script lang="ts" setup>
import Table from "./Table.vue";
import Activator from "./Activator.vue";

const { params } = useRoute();

const { data } = useProductPackageLogs(params.id as string, { lazy: true });
</script>

<template>
  <div class="d-flex align-center">
    <p class="text-h6 font-weight-medium my-3">EMBALAGEM / PESO</p>

    <v-dialog transition="dialog-top-transition" width="60vw">
      <template #activator="{ props }">
        <Activator v-bind="props" :length="data?.length ?? 0" />
      </template>

      <template #default>
        <v-sheet class="mx-2 mt-2" rounded="xl" elevation="5">
          <v-toolbar title="LOG DE EMBALAGENS" rounded="t-xl" class="mb-5" />

          <Table :rows="data" />
        </v-sheet>
      </template>
    </v-dialog>
  </div>
</template>
