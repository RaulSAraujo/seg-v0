<script setup lang="ts">
import type { Row, Form } from "~/interfaces/TablePrice";

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const dialog = ref(false);

const create = async (form: Form) => {
  loading.start();

  try {
    const res = await $customFetch<Row>("table-price", {
      method: "POST",
      body: form,
    });

    $toast().success("Novo preço balcão cadastrado.");

    items.value.splice(0, 0, res);

    items.value.pop();

    totalItems.value += 1;

    dialog.value = false;
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }

  loading.finish();
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="300px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <TablePriceForm title="NOVO PREÇO BALCÃO" @save="create($event)" />
  </v-dialog>
</template>
