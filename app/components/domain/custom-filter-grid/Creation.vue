<script setup lang="ts">
import type { Row, Form } from "~/interfaces/CustomFilterGrid";

const dialog = ref(false);

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const { capitalizeFirstLetter } = useCapitalize();

const create = async (form: Form) => {
  loading.start();

  const newForm = form;

  newForm.label = capitalizeFirstLetter(newForm.label);

  if (newForm.fixed_values) {
    newForm.fixed_values = JSON.parse(newForm.fixed_values);
  }

  try {
    const res = await $customFetch<Row>("custom-filters", {
      method: "POST",
      body: {
        ...newForm,
        external: true,
      },
    });

    $toast().success("Novo registro criado com sucesso.");

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
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="430px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <CustomFilterGridForm title="NOVO FILTRO E GRID" @save="create($event)" />
  </v-dialog>
</template>
