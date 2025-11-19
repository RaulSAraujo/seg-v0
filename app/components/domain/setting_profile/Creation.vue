<script setup lang="ts">
import type { Row, Form } from "~/interfaces/Group";

const dialog = ref(false);

const { $customFetch } = useNuxtApp();

const tableStore = useTableStore();
const { items, totalItems } = storeToRefs(tableStore);

const loading = useLoadingIndicator();

const create = async (form: Form) => {
  loading.start();

  try {
    const res = await $customFetch<Row>("group", {
      method: "POST",
      body: {
        ...form,
        login_time_range: [],
        access_restriction: true,
      },
    });

    $toast().success("Novo grupo cadastrado com sucesso.");

    items.value.push(res);

    if (items.value.length == 10) {
      items.value.pop();
    }

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
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="260px">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="mr-2"
        text="CRIAR"
        rounded="lg"
        color="primary"
      />
    </template>

    <SettingProfileForm title="NOVO GRUPO" @save="create($event)" />
  </v-dialog>
</template>
